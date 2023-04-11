import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async action
// в params будут храниться email и пароль

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post(
      "http://localhost:4444/auth/login",
      params
    );
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("http://localhost:4444/auth/me");
  return data;
});

// запрос на авторизацию.
export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
  const { data } = await axios.post("http://localhost:4444/auth/register", params);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUserData.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

//селектор
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
