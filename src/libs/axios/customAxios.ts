import { ACCESS_TOKEN_KEY, REQUEST_TOKEN_KEY } from "@src/constants/token.constants";
import axios, { AxiosRequestConfig } from "axios";
import token from "../token/token";
import requestHandler from "./requestHandler";
import responseHandler from "./responseHandler";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    [REQUEST_TOKEN_KEY]: `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`,
  },
};

const customAxios = axios.create(axiosRequestConfig);
customAxios.interceptors.request.use(requestHandler as any, (err) => Promise.reject(err));
customAxios.interceptors.response.use((res) => res, responseHandler);

export default customAxios;

export const setAccessToken = (token: string) => {
  customAxios.defaults.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`;
};
