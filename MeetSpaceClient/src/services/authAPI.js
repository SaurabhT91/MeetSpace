import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setAccessToken, setError } from "../slices/authSlice";
import { useDispatch } from "react-redux";

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
      onError: (error, { dispatch }) => {
        console.error("Login error:", error);
        dispatch(setError(error));
        return error;
      },
      onSuccess: (data, { dispatch }) => {
        console.log("onSuccess callback executed with data:", data);
        

        useDispatch(setUser(data.user));
        useDispatch(setAccessToken(data.accessToken));

        useDispatch(setError(null));

        return data;
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
