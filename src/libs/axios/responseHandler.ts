import axios, { AxiosError } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "../../constants/token.constants";
import CONFIG from "src/config/config.json";

let isRefreshing = false;
let refreshSub: ((accessToken: string) => void)[] = [];

const onTokenRefresh = (token: string) => {
  refreshSub.map((callback) => callback(token));
};

const addRefreshSub = (callback: (token: string) => void) => {
  refreshSub.push(callback);
};

const errorResponseHandler = async (error: AxiosError) => {
  if (error.response) {
    const {
      config: originalRequest,
      response: { status },
    } = error;

    const usingAccessToken = token.getToken(ACCESS_TOKEN_KEY);
    const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (usingAccessToken !== undefined && usingRefreshToken !== undefined && status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await axios.post(`${CONFIG.serverUrl}/YOUR_REFRESH_API`, {
            refreshToken: usingRefreshToken, //change your refresh api's body value
          });

          const newAccessToken = data.data.accessToken; //CHANGE BY YOUR RESPONSE
          token.setToken(ACCESS_TOKEN_KEY, newAccessToken);

          isRefreshing = false;
          onTokenRefresh(newAccessToken);
        } catch (error) {
          token.clearToken();
          window.location.href = "/YOUR_LOGIN_URL"; //change location to your login URL
        }
      }

      return new Promise((resolve, reject) => {
        addRefreshSub((token: string) => {
          if (originalRequest) {
            originalRequest.headers![REQUEST_TOKEN_KEY] = `Bearer ${token}`;
            resolve(token);
          } else {
            reject("originalRequest is undefined");
          }
        });
      });
    }
  }
};
