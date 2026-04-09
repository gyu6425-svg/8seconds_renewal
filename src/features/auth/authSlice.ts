import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthSessionPayload, AuthState } from './authTypes';

const AUTH_STORAGE_KEY = 'auth';

const baseInitialState: AuthState = {
  isLoggedIn: false,
  userId: null,
  accessToken: null,
  loading: false,
  error: null,
};

const getStoredAuthState = (): Partial<AuthState> => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const savedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedAuth) {
      return {};
    }

    const parsedAuth = JSON.parse(savedAuth) as Partial<AuthState>;

    return {
      isLoggedIn: typeof parsedAuth.isLoggedIn === 'boolean' ? parsedAuth.isLoggedIn : false,
      userId: typeof parsedAuth.userId === 'string' ? parsedAuth.userId : null,
      accessToken: typeof parsedAuth.accessToken === 'string' ? parsedAuth.accessToken : null,
    };
  } catch {
    return {};
  }
};

const persistAuthState = (payload: AuthSessionPayload) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      isLoggedIn: true,
      userId: payload.userId,
      accessToken: payload.accessToken,
    }),
  );
};

const clearStoredAuthState = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

const initialState: AuthState = {
  ...baseInitialState,
  ...getStoredAuthState(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthSessionPayload>) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      persistAuthState(action.payload);
    },
    logout(state) {
      state.isLoggedIn = baseInitialState.isLoggedIn;
      state.userId = baseInitialState.userId;
      state.accessToken = baseInitialState.accessToken;
      state.loading = baseInitialState.loading;
      state.error = baseInitialState.error;
      clearStoredAuthState();
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
