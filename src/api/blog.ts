import configureEndpoint from "./host";

import { Post } from "../store/blog/types";

const BASE_URL = configureEndpoint("blog");

export const getPosts = async (token: string): Promise<Post[]> => {
  try {
    const data = await fetch(`${BASE_URL}/recent/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await data.json();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const createPost = async (
  token: string,
  body: string
): Promise<Post> => {
  const formData = new FormData();
  formData.set("body", body);
  try {
    const data = await fetch(`${BASE_URL}/create/`, {
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.status.toString().startsWith("2"))
      throw new Error(JSON.stringify(await data.json()));
    return await data.json();
  } catch (e) {
    throw new Error(e.message);
  }
};
