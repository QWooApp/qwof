import { LOGIN, LOGOUT, LoginAction, LogoutAction } from "./types";

export const logIn = (token: string, username: string): LoginAction => ({
  type: LOGIN,
  payload: { token, username },
});

export const logOut = (): LogoutAction => ({
  type: LOGOUT,
});
