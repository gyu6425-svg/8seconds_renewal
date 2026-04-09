export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthSessionPayload {
  userId: string;
  accessToken: string;
  refreshToken?: string | null;
  user?: AuthUser | null;
}
