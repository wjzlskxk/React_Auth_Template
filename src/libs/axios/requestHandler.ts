import { InternalAxiosRequestConfig } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "@src/constants/token.constants";

const requestHandler = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (typeof window !== "undefined") {
    const accessToken = token.getToken(ACCESS_TOKEN_KEY);
    const refreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (!accessToken || !refreshToken) {
      console.error("accessToken or refreshToken was not found");
      window.location.href = "/login";
    } else {
      config.headers[REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
    }
  }

  return config;
};

export default requestHandler;
