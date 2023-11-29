import { createStore, combineReducers } from "redux";
import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";
import auth from "redux/modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { devToolsEnhancer } from "redux-devtools-extension";

// 순수 리덕스
// const rootReducer = combineReducers({ letters, member });
// const store = createStore(rootReducer, devToolsEnhancer());

// RTK
const store = configureStore({
  reducer: {
    letters,
    member,
    auth,
  },
});

export default store;
