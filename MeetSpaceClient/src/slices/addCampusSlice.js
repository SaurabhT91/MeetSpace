import { createSlice } from "@reduxjs/toolkit";

export const addCampusSlice = createSlice({
  name: "addCampus",
  initialState: {
    addingCampus: false,
    error: null,
    campusInfo: null, // Add campusInfo to store campus information
  },
  reducers: {
    setAddingCampus: (state, action) => {
      state.addingCampus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCampusInfo: (state, action) => {
      // Define setCampusInfo reducer
      state.campusInfo = action.payload;
    },
  },
});

export const { setAddingCampus, setError, setCampusInfo } =
  addCampusSlice.actions;

// Selectors
export const selectAddingCampus = (state) => state.addCampus.addingCampus;
export const selectAddCampusError = (state) => state.addCampus.error;
export const selectCampusInfo = (state) => state.addCampus.campusInfo; // Selector for campusInfo

export default addCampusSlice.reducer;
