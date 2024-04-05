import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inviteAPI = createApi({
  reducerPath: "inviteAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    inviteUser: builder.mutation({
      query: (credentials) => ({
        url: "sendInvite",
        method: "POST",
        body: credentials,
      }),
      onError: (error) => {
        console.error("Login error:", error);
        throw error;
      },
      onSuccess: () => {
        return "Invitetion sent successfully";
      },
    }),
  }),
});

export const { useInviteUserMutation } = inviteAPI;
