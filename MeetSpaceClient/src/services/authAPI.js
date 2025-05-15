import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser, setAccessToken, setError } from "../slices/authSlice";
const API_BASE = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
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
          const errorData = {
            message: error.message,
            status: error.status,
          };

          return errorData;
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
