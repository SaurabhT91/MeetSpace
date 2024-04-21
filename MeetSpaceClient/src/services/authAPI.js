import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setAccessToken } from "../slices/authSlice";

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
      onSuccess: (data, { dispatch }) => {
        console.log("onSuccess callback executed with data:", data);

        const accessToken = data.accessToken;
        const user = data.user;
        dispatch(setUser(user));
        dispatch(setAccessToken({ accessToken }));
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
