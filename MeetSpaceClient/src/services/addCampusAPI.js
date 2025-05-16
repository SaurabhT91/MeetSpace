import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../slices/addCampusSlice";
const API_BASE = import.meta.env.VITE_API_URL;

export const addCampusApi = createApi({
  reducerPath: "addCampusApi",
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
    addCampus: builder.mutation({
      query: (campusData) => ({
        url: "addCampus",
        method: "POST",
        body: campusData,
      }),
      onError: ({ error, dispatch }) => {
        // Log the error for debugging
        console.error("Add campus error:", error);

        // Dispatch action to set the error in the state
        dispatch(
          setError(
            "An error occurred while adding campus. Please try again later."
          )
        );
      },
    }),
  }),
});

export const { useAddCampusMutation } = addCampusApi;
