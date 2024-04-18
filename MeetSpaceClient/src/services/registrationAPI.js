import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../slices/registrationSlice";

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        body: userData,
      }),
      onError: ({ error, dispatch }) => {
        console.error("Registration error:", error);
        const { error: errorMessage, errors } = error.data;
        dispatch(setError({ message: errorMessage, errors }));
        throw error;
      },
    }),
  }),
});

export const { useRegisterUserMutation } = registrationApi;
