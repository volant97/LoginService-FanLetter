import { createSlice } from "@reduxjs/toolkit";
import { loadLocalStorage } from "utils/LocalStorage";

const accessToken = loadLocalStorage("accessToken");

let initialState = !!accessToken ? true : false;

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
