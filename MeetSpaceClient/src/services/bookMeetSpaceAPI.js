import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookMeetSpaceAPI = createApi({
  reducerPath: "MeetSpaceAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    bookingRequest: builder.mutation({
      query: (BookingRequestData) => ({
        url: "bookingRequest",
        method: "POST",
        body: BookingRequestData,
      }),
      onError: (error) => {
        console.error("Booking Request error:", error);
        throw error;
      },
      onSuccess: (data) => {
        return data.BookingAcknowledgement;
      },
    }),
  }),
});

export const { useBookingRequestMutation } = bookMeetSpaceAPI;
