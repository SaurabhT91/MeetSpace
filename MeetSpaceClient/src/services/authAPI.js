import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setAccessToken, setError } from "../slices/authSlice";

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
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAccessToken(data.accessToken));
          dispatch(setUser(data.user));
        } catch (error) {
          dispatch(setError(error));
          throw error;
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
