import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      onError: (error) => {
        console.error("Login error:", error);
        throw error;
      },
      onSuccess: (data) => {
        return data.user;
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;


