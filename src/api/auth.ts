import configureEndpoint from "./host";
import { Credentials, LoginPayload } from "../store/auth/types";

const BASE_URL = configureEndpoint("user");

interface GetTokenResponse {
  access: string;
}

export const getToken = async (
  credentials: Credentials
): Promise<GetTokenResponse> => {
  const { username, password } = credentials;

  const formData = new FormData();
  formData.set("username", username);
  formData.set("password", password);

  const data = await fetch(`${BASE_URL}/token/`, {
    body: formData,
    method: "post",
  });

  if (data.status !== 200) throw new Error("Invalid credentials.");
  return await data.json();
};

export const getAuthTokenViaGoogle = async (
  tokenId: string
): Promise<LoginPayload> => {
  const formData = new FormData();
  formData.set("token", tokenId);
  const data = await fetch(`${BASE_URL}/google/`, {
    body: formData,
    method: "post",
  });
  return await data.json();
};
