import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addCampusApi = createApi({
  reducerPath: "addCampusApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    addCampus: builder.mutation({
      query: (campusData) => ({
        url: "addCampus",
        method: "POST",
        body: campusData,
      }),
      onError: (error) => {
        console.error("Add campus error:", error);
        throw error;
      },
    }),
  }),
});

export const { useAddCampusMutation } = addCampusApi;
