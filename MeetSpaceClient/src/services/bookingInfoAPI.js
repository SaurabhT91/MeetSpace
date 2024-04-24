import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingInfoAPI = createApi({
  reducerPath: "bookingInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {

        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchBookingData: builder.query({
      query: (id) => ({
        url: `bookingSchedule/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useFetchBookingDataQuery } = bookingInfoAPI;
