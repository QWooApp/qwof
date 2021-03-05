import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import blogReducer from "./posts/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
