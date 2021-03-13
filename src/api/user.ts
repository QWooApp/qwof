import configureEndpoint from "./host";
import { Post } from "../store/blog/types";
import { UserData } from "../store/auth/types";

const BASE_URL = configureEndpoint("user");

export interface UserDetails extends UserData {
  bio: string;
  posts: Post[];
  privacy: boolean;
  date_joined?: string;
  avatar: string | null;
  is_following?: boolean;
  follow_requested: boolean;
}

export const getUserDetails = async (
  username: string,
  token?: string
): Promise<UserDetails> => {
  let headers = {};
  if (token)
    headers = {
      Authorization: `Bearer ${token}`,
    };

  const data = await fetch(`${BASE_URL}/detail/${username}/`, { headers });
  if (data.status !== 200) throw new Error("User not found.");
  return await data.json();
};
