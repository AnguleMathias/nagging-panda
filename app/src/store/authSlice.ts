import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { isTokenExpired } from "@/utils/auth";
import { signOut } from "next-auth/react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      username,
      password,
      email,
    }: { username: string; password: string; email: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username,
        password,
        email,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Signup failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      return {
        accessToken: response.data.accessToken,
        userId: response.data.userId,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      signOut({ redirect: false });
    },
    checkTokenExpiration(state) {
      if (state.token) {
        const isNotValid = isTokenExpired(state.token);

        if (isNotValid) {
          state.isAuthenticated = false;
          state.token = null;
          state.userId = null;
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload?.accessToken || null;
      state.userId = action.payload?.userId;
      if (state.token && state.userId) {
        localStorage.setItem("token", state.token);
        localStorage.setItem("userId", state.userId);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.error = action.payload as string;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.error = action.payload as string;
    });
  },
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
