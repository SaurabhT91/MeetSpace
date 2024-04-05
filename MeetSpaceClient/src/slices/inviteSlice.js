import { createSlice } from "@reduxjs/toolkit";

export const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    invitationAcknowledgement: null,
    error: null,
  },
  reducers: {
    setInvitationAcknowledgement: (state, action) => {
      state.invitationAcknowledgement = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setInvitationAcknowledgement, setError } = invitationSlice.actions;

export default invitationSlice.reducer;
