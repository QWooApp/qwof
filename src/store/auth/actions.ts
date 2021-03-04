import { LOGIN, LOGOUT, LoginAction, LogoutAction } from "./types";

export const logIn = (token: string, name: string): LoginAction => ({
  type: LOGIN,
  payload: { token, name },
});

export const logOut = (): LogoutAction => ({
  type: LOGOUT,
});
