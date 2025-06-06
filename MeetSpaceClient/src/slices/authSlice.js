import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {

      state.accessToken = action.payload;
      state.error = null;
    },
    setUser: (state, action) => {

      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAccessToken, setUser, logout, setError } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
