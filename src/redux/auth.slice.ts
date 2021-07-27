import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";
import * as auth from "context/auth-provider";
import { AuthForm } from "context/auth";

interface State {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: State = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (params: AuthForm, thunkAPI) => {
    const data = await auth.login(params);
    return data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params: AuthForm, thunkAPI) => {
    const { user } = await auth.register(params);
    return user;
  }
);

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  const data = await auth.getUserInfo();
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      auth.logout();
    },
  },
  extraReducers: {
    [login.pending.type](state, action: PayloadAction<User>) {
      state.isLoading = true;
    },
    [login.fulfilled.type](state, action: PayloadAction<User>) {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload;
    },
    [login.rejected.type](state, action) {
      state.error = new Error(action.error.message);
      state.isLoading = false;
      state.user = null;
    },
    [register.pending.type](state, action: PayloadAction<User>) {
      state.isLoading = true;
    },
    [register.fulfilled.type](state, action: PayloadAction<User>) {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload;
    },
    [register.rejected.type](state, action) {
      state.error = new Error(action.error.message);
      state.isLoading = false;
      state.user = null;
    },
    [getUserInfo.pending.type](state, action: PayloadAction<User>) {
      state.isLoading = true;
    },
    [getUserInfo.fulfilled.type](state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUserInfo.rejected.type](state, action: PayloadAction<User>) {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const authAction = authSlice.actions;
