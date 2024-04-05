import { createSlice } from "@reduxjs/toolkit";

export const BookMeetSpaceSlice = createSlice({
  name: "BookMeetSpace",
  initialState: {
    BookingAcknowledgementInfo: null,
    error: null,
  },
  reducers: {
    setBookingAcknowledgement: (state, action) => {
      state.BookingAcknowledgementInfo = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setBookingAcknowledgement, setError } = BookMeetSpaceSlice.actions;

export default BookMeetSpaceSlice.reducer;
