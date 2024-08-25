import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/constants/token.constants";
import cookie from "../cookie/cookie";

class Token {
  public getToken(key: string): string | undefined {
    return cookie.getCookie(key);
  }

  public setToken(key: string, value: string): void {
    return cookie.setCookie(key, value);
  }

  public clearToken() {
    cookie.deleteCookie(ACCESS_TOKEN_KEY);
    cookie.deleteCookie(REFRESH_TOKEN_KEY);
  }
  
}

export default new Token();
