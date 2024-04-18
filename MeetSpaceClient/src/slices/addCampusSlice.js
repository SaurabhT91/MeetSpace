import { createSlice } from "@reduxjs/toolkit";

export const addCampusSlice = createSlice({
  name: "addCampus",
  initialState: {
    addingCampus: false,
    error: null,
    campusInfo: null,
  },
  reducers: {
    setAddingCampus: (state, action) => {
      state.addingCampus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCampusInfo: (state, action) => {
      state.campusInfo = action.payload;
      state.error = null; // Reset error to null after success
    },
  },
});

export const { setAddingCampus, setError, setCampusInfo } =
  addCampusSlice.actions;

// Selectors
export const selectAddingCampus = (state) => state.addCampus.addingCampus;
export const selectAddCampusError = (state) => state.addCampus.error;
export const selectCampusInfo = (state) => state.addCampus.campusInfo;

export default addCampusSlice; // Export the addCampusSlice
