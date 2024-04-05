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
  },
});

export const { setRegistering, setError } = registrationSlice.actions;

// Selectors
export const selectRegistering = (state) => state.registration.registering;
export const selectRegistrationError = (state) => state.registration.error;

export default registrationSlice.reducer;
