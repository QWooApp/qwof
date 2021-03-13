import configureEndpoint from "./host";

const BASE_URL = configureEndpoint("feed");

export const followUser = async (token: string, username: string) => {
  await fetch(`${BASE_URL}/follow/${username}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unFollowUser = async (token: string, username: string) => {
  await fetch(`${BASE_URL}/unfollow/${username}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
