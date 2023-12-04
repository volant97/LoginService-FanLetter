import { createSlice } from "@reduxjs/toolkit";

// RTK
const initialState = "카리나";

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMember: (state, action) => {
      const activeMember = action.payload;
      return activeMember;
    },
  },
});

export default memberSlice.reducer;
export const { setMember } = memberSlice.actions;
