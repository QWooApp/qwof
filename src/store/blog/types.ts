export const SET_POSTS = "SET_POSTS";
export const HEART_POST = "HEART_POST";
export const UNHEART_POST = "UNHEART_POST";
export const PREPEND_POST = "PREPEND_POST";
export const TOGGLE_POST_FORM_DIALOG = "TOGGLE_POST_FORM_DIALOG";

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
  heart_count: number;
  reply_count: number;
  is_hearted?: boolean;
  repost_count: number;
}

export interface BlogState {
  posts: Post[];
  dialog: boolean;
}

export interface SetPostsAction {
  payload: Post[];
  type: typeof SET_POSTS;
}

export interface HeartPostAction {
  payload: number;
  type: typeof HEART_POST;
}

export interface UnHeartPostAction {
  payload: number;
  type: typeof UNHEART_POST;
}

export interface PrependPostAction {
  payload: Post;
  type: typeof PREPEND_POST;
}

export interface TogglePostFormDialogAction {
  payload: boolean;
  type: typeof TOGGLE_POST_FORM_DIALOG;
}

export type BlogActionType =
  | SetPostsAction
  | HeartPostAction
  | UnHeartPostAction
  | PrependPostAction
  | TogglePostFormDialogAction;
