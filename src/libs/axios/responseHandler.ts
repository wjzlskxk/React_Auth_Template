import axios, { AxiosError } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "@src/constants/token.constants";
import customAxios from "./customAxios";

let isRefreshing: boolean = false;
let refreshSub: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSub.forEach((callback) => callback(accessToken));
};

const addRefeshSub = (callback: (accessToken: string) => void) => {
  refreshSub.push(callback);
};

const responseHandler = async (error: AxiosError) => {
  if (error.response) {
    const {
      config: originalRequest,
      response: { status },
    } = error;

    const usingAccessToken = token.getToken(ACCESS_TOKEN_KEY);
    const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (usingAccessToken !== undefined && usingAccessToken !== undefined && status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const { data } = await axios.post(`$${process.env.REACT_APP_SERVER_URL}/refresh`, {
          refreshToken: usingRefreshToken,
        });
        customAxios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${data.data.accessToken}`; //CHANGE_YOUR_RESPONSE
        token.setToken(ACCESS_TOKEN_KEY, data.data.accessToken); //CHANGE_YOUR_RESPONSE

        isRefreshing = false;
        onTokenRefreshed(data.data.accessToken); //CHANGE_YOUR_RESPONSE

        return new Promise((resolve) => {
          addRefeshSub((accessToken: string) => {
            originalRequest!.headers![REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
            resolve(customAxios(originalRequest!));
          });
        });
      } catch (error) {
        console.error("Failed to refresh accessToken: ", error);
        token.clearToken();
        window.alert("세션 만료");
        window.location.href = "/login";
      }
    }
  }

  return Promise.reject(error);
};

export default responseHandler;
