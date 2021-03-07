import {
  Post,
  SET_POSTS,
  HEART_POST,
  DELETE_POST,
  PREPEND_POST,
  UNHEART_POST,
  SetPostsAction,
  HeartPostAction,
  PrependPostAction,
  UnHeartPostAction,
  DeletePostAction,
  TOGGLE_POST_FORM_DIALOG,
  TogglePostFormDialogAction,
} from "./types";

export const setPosts = (posts: Post[]): SetPostsAction => ({
  payload: posts,
  type: SET_POSTS,
});

export const deletePost = (index: number): DeletePostAction => ({
  payload: index,
  type: DELETE_POST,
});

export const heartPost = (index: number): HeartPostAction => ({
  payload: index,
  type: HEART_POST,
});

export const unheartPost = (index: number): UnHeartPostAction => ({
  payload: index,
  type: UNHEART_POST,
});

export const prependPost = (post: Post): PrependPostAction => ({
  payload: post,
  type: PREPEND_POST,
});

export const toggleDialog = (state: boolean): TogglePostFormDialogAction => ({
  payload: state,
  type: TOGGLE_POST_FORM_DIALOG,
});
