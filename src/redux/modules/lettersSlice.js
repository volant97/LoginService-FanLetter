import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
// import fakeData from "fakeData.json";

const initialState = {
  letters: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DB_SERVER_URL}/letters?_sort=createdAt&_order=desc`
      );
      // console.log("get response : ", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error : ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPI) => {
    // payload = newLetter
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DB_SERVER_URL}/letters`,
        payload
      );
      console.log("add response : ", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error : ", error);
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(addLetter(payload));
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (payload, thunkAPI) => {
    // payload = letterId
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_DB_SERVER_URL}/letters/${payload}`
      );
      // console.log("delete response : ", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error : ", error);
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(deleteLetter(payload));
    }
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async (payload, thunkAPI) => {
    // payload = { id, editingText }
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_DB_SERVER_URL}/letters/${payload.id}`,
        {
          content: payload.editingText,
        }
      );
      // console.log("edit response : ", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error : ", error);
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(editLetter(payload));
    }
  }
);

// 실행 X...
export const __updateInfoLetter = createAsyncThunk(
  "updateInfoLetter",
  async (payload, thunkAPI) => {
    // payload = { userId, avatar, nickname }
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_DB_SERVER_URL}/letters`,
        {
          avatar: payload.avatar,
          nickname: payload.nickname,
        }
      );
      console.log("updateInfo response : ", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error : ", error);
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(updateInfoLetter(payload));
    }
  }
);

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
    },
    deleteLetter: (state, action) => {
      const letterId = action.payload;
      return state.filter((letter) => letter.id !== letterId);
    },
    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      return state.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
    // 실행 X...
    updateInfoLetter: (state, action) => {
      const { userId, avatar, nickname } = action.payload;
      return state.map((letter) => {
        console.log("letter : ", letter);
        if (letter.userId === userId) {
          return { ...letter, avatar, nickname };
        }
        return letter;
      });
    },
  },
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter, updateInfoLetter } =
  lettersSlice.actions;
