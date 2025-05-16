import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_URL;

export const bookingInfoAPI = createApi({
  reducerPath: "bookingInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
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
