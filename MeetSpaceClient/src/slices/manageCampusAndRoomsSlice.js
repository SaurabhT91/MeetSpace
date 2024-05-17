// manageCampusAndRoomsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const campusAndRoomsSlice = createSlice({
  name: "campusAndRooms",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    setCampusAndRoomsData: (state, action) => {
      state.data = action.payload;
      state.error = null;
      console.log("Data set in campusAndRoomsSlice:", action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      console.log("Error set in campusAndRoomsSlice:", action.payload);
    },
  },
});

export const { setCampusAndRoomsData, setError } = campusAndRoomsSlice.actions;

export const selectCampusAndRoomsData = (state) => state.campusAndRooms.data;
export const selectCampusAndRoomsError = (state) => state.campusAndRooms.error;

export default campusAndRoomsSlice.reducer;
