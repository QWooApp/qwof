import { BlogState, SET_POSTS, PREPEND_POST, BlogActionType } from "./types";

const initialState: BlogState = {
  posts: [],
};

const blogReducer = (
  state: BlogState = initialState,
  action: BlogActionType
): BlogState => {
  switch (action.type) {
    case PREPEND_POST:
      return {
        posts: [action.payload, ...state.posts],
      };
    case SET_POSTS:
      return {
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
