import type { AuthResponse } from '../../shared/api/auth';
import type { AuthSessionPayload } from './authTypes';

export const normalizeAuthResponse = (
  response: AuthResponse,
): AuthSessionPayload | null => {
  const directUserId = response.userId;
  const nestedUserId = response.user?.id;
  const resolvedUserId =
    directUserId != null
      ? String(directUserId)
      : nestedUserId != null
        ? String(nestedUserId)
        : null;

  if (!resolvedUserId || !response.accessToken) {
    return null;
  }

  return {
    userId: resolvedUserId,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken ?? null,
    user:
      response.user && response.user.id != null
        ? {
            id: String(response.user.id),
            email: response.user.email,
            name: response.user.name,
          }
        : null,
  };
};
