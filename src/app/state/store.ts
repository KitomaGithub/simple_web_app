import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";

import counterReducer from "./counter/counterSlice";
import blogReducer from "./blogs/blogSlice";
import userReducer from "./user/userSlice"
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const myReducers = combineReducers({
        counter: counterReducer,
        blogs: blogReducer,
        user: userReducer
    })

const persistedReducer = persistReducer(persistConfig, myReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getMiddleware) => {
      const middleware = getMiddleware({
        serializableCheck: {
          ignoreActions: true
        }
          
      })

      return middleware;
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;