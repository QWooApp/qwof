import configureEndpoint from "./host";

const BASE_URL = configureEndpoint("heart");

interface HeartResponse {
  id: number;
  datetime: string;
}

export const createHeart = async (
  token: string,
  post_id: string
): Promise<HeartResponse> => {
  const formData = new FormData();
  formData.set("post_id", post_id);
  const data = await fetch(`${BASE_URL}/create/`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await data.json();
};

export const deleteHeart = async (token: string, post_id: string) => {
  const formData = new FormData();
  formData.set("post_id", post_id);
  await fetch(`${BASE_URL}/delete/${post_id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
