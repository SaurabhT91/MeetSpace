import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/authAPI";
import { bookingInfoAPI } from "./services/bookingInfoAPI";
import { campusAndRoomInfoAPI } from "./services/campus&roomInfoAPI";
import { bookMeetSpaceAPI } from "./services/bookMeetSpaceAPI";
import { inviteAPI } from "./services/inviteAPI"; // Import inviteAPI
import { registrationSlice } from "./slices/registrationSlice"; // Import registrationSlice
import { registrationApi } from "./services/registrationAPI"; // Import registrationApi

// Add inviteAPI and registrationApi reducers to the whitelist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "inviteAPI"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookingInfoAPI.reducerPath]: bookingInfoAPI.reducer,
    [campusAndRoomInfoAPI.reducerPath]: campusAndRoomInfoAPI.reducer,
    [bookMeetSpaceAPI.reducerPath]: bookMeetSpaceAPI.reducer,
    [inviteAPI.reducerPath]: inviteAPI.reducer,
    registration: registrationSlice.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
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
      registrationApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
