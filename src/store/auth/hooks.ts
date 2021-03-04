import { useSelector } from "react-redux";

import { AuthState } from "./types";

interface AuthStateType {
  auth: AuthState;
}

export const useToken = (): string | undefined =>
  useSelector(({ auth }: AuthStateType) => auth.token);

export const useUsername = (): string | undefined =>
  useSelector(({ auth }: AuthStateType) => auth.username);

export const useAuthenticated = (): boolean =>
  useSelector(({ auth }: AuthStateType) => auth.isAuthenticated);
