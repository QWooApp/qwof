export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthState {
  token?: string;
  username?: string;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  token: string;
  username: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginPayload;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionType = LoginAction | LogoutAction;
