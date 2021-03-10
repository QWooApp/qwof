import configureEndpoint from "./host";

import { Post } from "../store/blog/types";

const BASE_URL = configureEndpoint("blog");

export const getPosts = async (
  token?: string,
  fetchUrl?: string
): Promise<Post[]> => {
  let headers = {};

  const url = fetchUrl ? fetchUrl : `${BASE_URL}/recent/`;
  if (token) headers = { Authorization: `Bearer ${token}` };

  try {
    const data = await fetch(url, {
      headers,
    });
    if (data.status !== 200) throw new Error("Logged out in this session.");
    return await data.json();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deletePost = async (token: string, post_id: string) => {
  await fetch(`${BASE_URL}/delete/${post_id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

interface createPostParams {
  reply_to_id?: string;
  repost_of_id?: string;
}

export const createPost = async (
  token: string,
  body: string,
  id_params?: createPostParams
): Promise<Post> => {
  const formData = new FormData();
  formData.set("body", body);

  if (id_params) {
    const { reply_to_id, repost_of_id } = id_params;

    if (reply_to_id) formData.set("reply_to_id", reply_to_id);
    if (repost_of_id) formData.set("repost_of_id", repost_of_id);
  }

  try {
    const data = await fetch(`${BASE_URL}/create/`, {
      body: formData,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.status.toString().startsWith("2"))
      throw new Error(JSON.stringify(await data.json()));
    return await data.json();
  } catch (e) {
    throw new Error(e.message);
  }
};
