import configureEndpoint from "./host";
import { Credentials } from "../store/auth/types";

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
