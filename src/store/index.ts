import storage from "redux-persist/lib/storage";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";

import { rootReducer } from "./reducer";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: storage,
  blacklist: ["blog"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware())
);

export const persistor = persistStore(store);

export default store;
