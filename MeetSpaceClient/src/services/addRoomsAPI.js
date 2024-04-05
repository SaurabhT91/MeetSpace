import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addRoomsAPI = createApi({
  reducerPath: "addRoomsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
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

