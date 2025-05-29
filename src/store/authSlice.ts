import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/types';
import { setAuthToken, clearAuthToken } from '../api/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.initialized = true;
      setAuthToken(action.payload.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.initialized = true;
    },
    logout(state) {
      state.user = null;
      state.initialized = true;
      clearAuthToken();
    },
    setInitialized(state) {
      state.initialized = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;