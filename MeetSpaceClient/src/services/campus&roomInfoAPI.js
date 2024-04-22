import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const campusAndRoomInfoAPI = createApi({
  reducerPath: "campusAndRoomInfoAPI",
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
    fetchCampusAndRoomData: builder.query({
      query: () => ({
        url: "MeetingRoomsInformation",
        method: "POST",
      }),
    }),
  }),
});

export const { useFetchCampusAndRoomDataQuery } = campusAndRoomInfoAPI;
