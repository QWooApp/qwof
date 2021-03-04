export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthState {
  name?: string;
  token?: string;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  token: string;
  name: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginPayload;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionType = LoginAction | LogoutAction;
