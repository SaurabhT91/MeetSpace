import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_URL;

export const campusAndRoomInfoAPI = createApi({
  reducerPath: "campusAndRoomInfoAPI",
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
    fetchCampusAndRoomData: builder.query({
      query: () => ({
        url: "MeetingRoomsInformation",
        method: "POST",
      }),
    }),
  }),
});

export const { useFetchCampusAndRoomDataQuery } = campusAndRoomInfoAPI;
