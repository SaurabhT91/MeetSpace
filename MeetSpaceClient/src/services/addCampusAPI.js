import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../slices/addCampusSlice";

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
