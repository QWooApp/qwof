import {
  Post,
  SET_POSTS,
  HEART_POST,
  DELETE_POST,
  PREPEND_POST,
  UNHEART_POST,
  SetPostsAction,
  HeartPostAction,
  DeletePostAction,
  PrependPostAction,
  UnHeartPostAction,
  OPEN_DIALOG_WITH_POST,
  TOGGLE_POST_FORM_DIALOG,
  OpenDialogWithPostAction,
  TogglePostFormDialogAction,
  DialogPostType,
} from "./types";

export const setPosts = (posts: Post[]): SetPostsAction => ({
  payload: posts,
  type: SET_POSTS,
});

export const deletePost = (id: string): DeletePostAction => ({
  payload: id,
  type: DELETE_POST,
});

export const heartPost = (id: string): HeartPostAction => ({
  payload: id,
  type: HEART_POST,
});

export const unheartPost = (id: string): UnHeartPostAction => ({
  payload: id,
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

export const openDialogWithPost = (
  post: Post,
  type: DialogPostType
): OpenDialogWithPostAction => ({
  payload: {
    post,
    type,
  },
  type: OPEN_DIALOG_WITH_POST,
});
