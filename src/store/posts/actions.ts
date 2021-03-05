import {
  Post,
  SET_POSTS,
  PREPEND_POST,
  SetPostsAction,
  PrependPostAction,
} from "./types";

export const setPosts = (posts: Post[]): SetPostsAction => ({
  payload: posts,
  type: SET_POSTS,
});

export const prependPost = (post: Post): PrependPostAction => ({
  payload: post,
  type: PREPEND_POST,
});
