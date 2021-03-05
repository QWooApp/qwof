export const SET_POSTS = "SET_POSTS";
export const PREPEND_POST = "PREPEND_POST";

interface PostUser {
  name: string;
  username: string;
  avatar: string | null;
}

export interface Post {
  id: string;
  body: string;
  user: PostUser;
  timestamp: string;
}

export interface BlogState {
  posts: Post[];
}

export interface SetPostsAction {
  payload: Post[];
  type: typeof SET_POSTS;
}

export interface PrependPostAction {
  payload: Post;
  type: typeof PREPEND_POST;
}

export type BlogActionType = SetPostsAction | PrependPostAction;
