import { useSelector } from "react-redux";

import { Post, BlogState, OpenDialogWithPostPayload } from "./types";

interface BlogStateType {
  blog: BlogState;
}

export const usePosts = (): Post[] =>
  useSelector(({ blog }: BlogStateType) => blog.posts);

export const useDialogOpen = (): boolean =>
  useSelector(({ blog }: BlogStateType) => blog.dialog);

export const useDialogPost = (): OpenDialogWithPostPayload | undefined =>
  useSelector(({ blog }: BlogStateType) => blog.dialogPost);
