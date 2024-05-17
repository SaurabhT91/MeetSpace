import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCampusAndRoomsData } from "../slices/manageCampusAndRoomsSlice";

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
      query: (ownerId) => ({
        url: "ownersCampusAndRooms",
        method: "POST",
        body: { ownerId },
      }),
      onQueryFulfilled: (data, { dispatch }) => {
        console.log("Response from fetchCampusAndRoomData:", data);
        dispatch(setCampusAndRoomsData(data));
      },
    }),
  }),
});

export const { useFetchCampusAndRoomDataQuery } = campusAndRoomInfoAPI;
