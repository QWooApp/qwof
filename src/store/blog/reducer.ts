import {
  BlogState,
  SET_POSTS,
  HEART_POST,
  DELETE_POST,
  UNHEART_POST,
  PREPEND_POST,
  BlogActionType,
  OPEN_DIALOG_WITH_POST,
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

    case OPEN_DIALOG_WITH_POST:
      return {
        ...state,
        dialog: true,
        dialogPost: action.payload,
      };

    case SET_POSTS:
      return {
        dialog: false,
        posts: action.payload,
      };

    case DELETE_POST:
      return {
        dialog: false,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case HEART_POST:
      const updatedHeartPostArray = [...state.posts];

      updatedHeartPostArray.forEach((post) => {
        if (post.id === action.payload) {
          post.heart_count += 1;
          post.is_hearted = true;
        }
      });

      return { ...state, posts: updatedHeartPostArray };

    case UNHEART_POST:
      const updatedUnheartPostArray = [...state.posts];
      updatedUnheartPostArray.forEach((post) => {
        if (post.id === action.payload) {
          post.heart_count -= 1;
          post.is_hearted = false;
        }
      });
      return { ...state, posts: updatedUnheartPostArray };

    case TOGGLE_POST_FORM_DIALOG:
      return {
        ...state,
        dialogPost: undefined,
        dialog: action.payload,
      };

    default:
      return state;
  }
};

export default blogReducer;
