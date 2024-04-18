import { createSlice } from "@reduxjs/toolkit";

export const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    registering: false,
    error: null,
  },
  reducers: {
    setRegistering: (state, action) => {
      state.registering = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setRegistering, setError, clearError } =
  registrationSlice.actions;

export const selectRegistering = (state) => state.registration.registering;
export const selectRegistrationError = (state) => state.registration.error;

export default registrationSlice.reducer;
