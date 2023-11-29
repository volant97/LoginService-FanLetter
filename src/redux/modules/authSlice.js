import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginToggle: (state, action) => {
      const auth = action.payload;
      return !auth;
    },
  },
});

export default authSlice.reducer;
export const { LoginToggle } = authSlice.actions;
