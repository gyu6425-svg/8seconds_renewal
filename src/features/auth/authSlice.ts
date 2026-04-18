import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthSessionPayload, AuthState } from './authTypes';

const AUTH_STORAGE_KEY = 'auth';

// JWT payload의 exp 클레임 추출 (외부 라이브러리 없이 atob으로 디코딩)
const getJwtExpiry = (token: string): number | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64)) as Record<string, unknown>;
    return typeof decoded.exp === 'number' ? decoded.exp : null;
  } catch {
    return null;
  }
};

// 현재 시각 기준 토큰 만료 여부 확인 (exp 없으면 유효 처리)
const isTokenExpired = (token: string): boolean => {
  const exp = getJwtExpiry(token);
  if (exp === null) return false;
  return Math.floor(Date.now() / 1000) > exp;
};

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

    const accessToken = typeof parsedAuth.accessToken === 'string' ? parsedAuth.accessToken : null;

    // 만료된 토큰이면 localStorage 초기화 후 비로그인 상태로 복구
    if (accessToken && isTokenExpired(accessToken)) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return {};
    }

    return {
      isLoggedIn: typeof parsedAuth.isLoggedIn === 'boolean' ? parsedAuth.isLoggedIn : false,
      userId: typeof parsedAuth.userId === 'string' ? parsedAuth.userId : null,
      accessToken,
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
