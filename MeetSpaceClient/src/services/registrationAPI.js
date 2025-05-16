import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../slices/registrationSlice";
const API_BASE = import.meta.env.VITE_API_URL;

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
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
