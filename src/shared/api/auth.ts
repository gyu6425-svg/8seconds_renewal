import { apiClient } from './client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthUserResponse = {
  id?: string | number | null;
  email?: string;
  name?: string;
};

export type AuthResponse = {
  userId?: string | number | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: AuthUserResponse | null;
};

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', payload);
  return response.data;
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/signup', payload);
  return response.data;
}
