import {
  BlogState,
  SET_POSTS,
  HEART_POST,
  UNHEART_POST,
  PREPEND_POST,
  BlogActionType,
  TOGGLE_POST_FORM_DIALOG,
} from "./types";

const initialState: BlogState = {
  posts: [],
  dialog: false,
};

const blogReducer = (
  state: BlogState = initialState,
  action: BlogActionType
): BlogState => {
  switch (action.type) {
    case PREPEND_POST:
      return {
        dialog: false,
        posts: [action.payload, ...state.posts],
      };
    case SET_POSTS:
      return {
        dialog: false,
        posts: action.payload,
      };
    case HEART_POST:
      const updatedHeartPostArray = [...state.posts];
      updatedHeartPostArray[action.payload].is_hearted = true;
      updatedHeartPostArray[action.payload].heart_count += 1;
      return { ...state, posts: updatedHeartPostArray };
    case UNHEART_POST:
      const updatedUnheartPostArray = [...state.posts];
      updatedUnheartPostArray[action.payload].is_hearted = false;
      updatedUnheartPostArray[action.payload].heart_count -= 1;
      return { ...state, posts: updatedUnheartPostArray };
    case TOGGLE_POST_FORM_DIALOG:
      return {
        ...state,
        dialog: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
