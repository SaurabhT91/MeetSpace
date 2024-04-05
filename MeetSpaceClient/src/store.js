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
import { inviteAPI } from "./services/inviteAPI";
import { registrationSlice } from "./slices/registrationSlice";
import { registrationApi } from "./services/registrationAPI";
import { addCampusSlice } from "./slices/addCampusSlice";
import { addCampusApi } from "./services/addCampusAPI";
import { addRoomsAPI } from "./services/addRoomsAPI";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "addCampus"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookingInfoAPI.reducerPath]: bookingInfoAPI.reducer,
  [campusAndRoomInfoAPI.reducerPath]: campusAndRoomInfoAPI.reducer,
  [bookMeetSpaceAPI.reducerPath]: bookMeetSpaceAPI.reducer,
  [inviteAPI.reducerPath]: inviteAPI.reducer,
  registration: registrationSlice.reducer,
  [registrationApi.reducerPath]: registrationApi.reducer,
  addCampus: addCampusSlice.reducer,
  [addCampusApi.reducerPath]: addCampusApi.reducer,
  [addRoomsAPI.reducerPath]: addRoomsAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Ensure that persistedReducer is being used
export const store = configureStore({
  reducer: persistedReducer, // persistedReducer instead of combineReducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      bookingInfoAPI.middleware,
      campusAndRoomInfoAPI.middleware,
      bookMeetSpaceAPI.middleware,
      registrationApi.middleware,
      addCampusApi.middleware,
      addRoomsAPI.middleware,
    ]),
});


setupListeners(store.dispatch);

export const persistor = persistStore(store);
