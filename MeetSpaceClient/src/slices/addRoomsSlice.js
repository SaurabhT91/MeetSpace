import { createSlice } from "@reduxjs/toolkit";

export const addRoomsSlice = createSlice({
  name: "addRooms",
  initialState: {
    isLoading: false,
    errors: {},
  },
  reducers: {
    setAddingRoom: (state, action) => {
      state.isLoading = action.payload;
    },
    setRoomErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetRoomErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setAddingRoom, setRoomErrors, resetRoomErrors } =
  addRoomsSlice.actions;

export default addRoomsSlice.reducer;
