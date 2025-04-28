import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginResponse, credentials } from './types';
import * as authService from './services/authService';

export const loginUser = createAsyncThunk<LoginResponse, credentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error: any) {
      const message =
        error?.response?.data?.error || error?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk<LoginResponse, credentials>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.register(credentials);
    } catch (error: any) {
      const message =
        error?.response?.data?.error || error?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isLoginModalOpen: true,
  isLoggedIn: false,
  isGuest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
      state.error = null;
    },
    setIsGuest: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isGuest = false;
      state.error = null;
      state.isLoginModalOpen = true;
      authService.logout();
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isGuest = false;
        state.isLoginModalOpen = false;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isGuest = false;
        state.isLoginModalOpen = false;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { openLoginModal, closeLoginModal, setIsGuest, logout, setError } = authSlice.actions;
export default authSlice.reducer; 