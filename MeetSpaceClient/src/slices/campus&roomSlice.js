import { createSlice } from "@reduxjs/toolkit";

export const campusAndRoomInfoSlice = createSlice({
  name: "campusAndRoomInfo",
  initialstate: {
    CampusAndRoom: null,
  },
  reducers: {
    setcampusAndRoomData: (state, action) => {
      state.CampusAndRoom = action.payload;
    },
  },
});

export const { setcampusAndRoomData } = campusAndRoomInfoSlice.actions;

export default campusAndRoomInfoSlice.reducer;
