import { createSlice } from "@reduxjs/toolkit";

// 순수 리덕스
// Action Value
// const SET_MEMBER = "member/SET_MEMBER";

// Action Creator
// export const setMember = (payload) => {
//   return { type: SET_MEMBER, payload };
// };

// initialState
// const initialState = "카리나";

// Reducer
// const member = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_MEMBER:
//       const activeMember = action.payload;
//       return activeMember;
//     default:
//       return state;
//   }
// };

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
