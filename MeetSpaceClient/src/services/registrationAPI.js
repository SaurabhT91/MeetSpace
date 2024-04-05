import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      onError: (error) => {
        console.error("Registration error:", error);
        throw error;
      },
    }),
  }),
});

export const { useRegisterUserMutation } = registrationApi;


