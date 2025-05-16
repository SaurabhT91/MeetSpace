import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_URL;

export const inviteAPI = createApi({
  reducerPath: "inviteAPI",
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
    inviteUser: builder.mutation({
      query: (credentials) => ({
        url: "sendInvite",
        method: "POST",
        body: credentials,
      }),
      onError: (error) => {
        console.error("Invitation error:", error);
        throw error;
      },
      onSuccess: () => {
        return "Invitation sent successfully";
      },
    }),
  }),
});

export const { useInviteUserMutation } = inviteAPI;
