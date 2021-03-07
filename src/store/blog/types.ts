export const SET_POSTS = "SET_POSTS";
export const HEART_POST = "HEART_POST";
export const DELETE_POST = "DELETE_POST";
export const UNHEART_POST = "UNHEART_POST";
export const PREPEND_POST = "PREPEND_POST";
export const POST_DIALOG_REPLY = "POST_DIALOG_REPLY";
export const POST_DIALOG_REPOST = "POST_DIALOG_REPOST";
export const OPEN_DIALOG_WITH_POST = "OPEN_DIALOG_WITH_POST";
export const TOGGLE_POST_FORM_DIALOG = "TOGGLE_POST_FORM_DIALOG";

export interface PostUser {
  name: string;
  username: string;
  avatar: string | null;
}

interface RelatedSubPost {
  id: string;
  user: PostUser;
}

interface RelatedSubRepost extends RelatedSubPost {
  body: string;
}

interface RelatedSubPostReply extends RelatedSubPost {}

export interface Post {
  id: string;
  body: string;
  user: PostUser;
  timestamp: string;
  is_reply: boolean;
  is_repost: boolean;
  heart_count: number;
  reply_count: number;
  is_hearted?: boolean;
  repost_count: number;
  repost_of?: RelatedSubRepost | null;
  reply_to?: RelatedSubPostReply | null;
}

export interface BlogState {
  posts: Post[];
  dialog: boolean;
  dialogPost?: OpenDialogWithPostPayload;
}

export interface SetPostsAction {
  payload: Post[];
  type: typeof SET_POSTS;
}

export interface HeartPostAction {
  payload: string;
  type: typeof HEART_POST;
}

export interface UnHeartPostAction {
  payload: string;
  type: typeof UNHEART_POST;
}

export interface DeletePostAction {
  payload: string;
  type: typeof DELETE_POST;
}

export interface PrependPostAction {
  payload: Post;
  type: typeof PREPEND_POST;
}

export type DialogPostType =
  | typeof POST_DIALOG_REPLY
  | typeof POST_DIALOG_REPOST;

export interface OpenDialogWithPostPayload {
  post: Post;
  type: DialogPostType;
}

export interface OpenDialogWithPostAction {
  type: typeof OPEN_DIALOG_WITH_POST;
  payload: OpenDialogWithPostPayload;
}

export interface TogglePostFormDialogAction {
  payload: boolean;
  type: typeof TOGGLE_POST_FORM_DIALOG;
}

export type BlogActionType =
  | SetPostsAction
  | HeartPostAction
  | DeletePostAction
  | UnHeartPostAction
  | PrependPostAction
  | OpenDialogWithPostAction
  | TogglePostFormDialogAction;
