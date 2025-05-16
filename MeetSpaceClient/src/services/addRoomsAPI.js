import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_URL;


export const addRoomsAPI = createApi({
  reducerPath: "addRoomsAPI",
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
    addRoom: builder.mutation({
      query: (roomData) => ({
        url: "addRoom",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["Rooms"],
      onError: (error) => {
        if (error.status === 422) {
          return { errors: error.data.errors };
        }
        throw error;
      },
    }),
  }),
});

export const { useAddRoomMutation } = addRoomsAPI;

