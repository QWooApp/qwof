import { useSelector } from "react-redux";

import { BlogState, Post } from "./types";

interface BlogStateType {
  blog: BlogState;
}

export const usePosts = (): Post[] =>
  useSelector(({ blog }: BlogStateType) => blog.posts);

export const useDialogOpen = (): boolean =>
  useSelector(({ blog }: BlogStateType) => blog.dialog);
