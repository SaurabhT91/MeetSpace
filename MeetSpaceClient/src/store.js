import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/authAPI";
import { bookingInfoAPI } from "./services/bookingInfoAPI";
import { campusAndRoomInfoAPI } from "./services/campus&roomInfoAPI";
import { bookMeetSpaceAPI } from "./services/bookMeetSpaceAPI"; // Import bookMeetSpaceAPI

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookingInfoAPI.reducerPath]: bookingInfoAPI.reducer,
    [campusAndRoomInfoAPI.reducerPath]: campusAndRoomInfoAPI.reducer,
    [bookMeetSpaceAPI.reducerPath]: bookMeetSpaceAPI.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      bookingInfoAPI.middleware,
      campusAndRoomInfoAPI.middleware,
      bookMeetSpaceAPI.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
