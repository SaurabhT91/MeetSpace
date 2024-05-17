import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const availabilityAndTimeManagerAPI = createApi({
  reducerPath: "availabilityAndTimeManagerAPI",
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
    updateAvailability: builder.mutation({
      query: ({ campusId, availability }) => ({
        url: `updateAvailability/${campusId}`,
        method: "PUT",
        body: { availability },
      }),
    }),
    updateTiming: builder.mutation({
      query: ({ campusId, openTime, closeTime }) => ({
        url: `updateTiming/${campusId}`,
        method: "PUT",
        body: { openTime, closeTime },
      }),
    }),
  }),
});

export const { useUpdateAvailabilityMutation, useUpdateTimingMutation } =
  availabilityAndTimeManagerAPI;
