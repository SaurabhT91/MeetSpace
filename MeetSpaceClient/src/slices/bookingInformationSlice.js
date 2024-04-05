import { createSlice } from "@reduxjs/toolkit";

export const bookingInformationSlice = createSlice({
  name: "bookingInformation",
  initialstate: {
    bookingData: null,
    error: null,
    },
    reducers: {
        setBookingData: (state, action) => {
            state.bookingData = action.payload;
      },
          setError: (state, action) => {
      state.error = action.payload;
    },
  }
});

export const { setBookingData, setError } = bookingInformationSlice.actions;

export default bookingInformationSlice.reducer;