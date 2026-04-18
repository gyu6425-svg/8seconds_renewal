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

// Mock 유저 목록 (이메일 / 비밀번호)
const MOCK_USERS = [
  { id: 'user-1', email: 'user@8seconds.com', password: '1234',     name: '에잇세컨즈' },
  { id: 'user-2', email: 'test@test.com',      password: 'test1234', name: '테스트유저' },
];

// exp 없는 mock 토큰 생성 (만료 없음)
const makeMockToken = (userId: string): string => {
  const header  = btoa(JSON.stringify({ alg: 'none' }));
  const payload = btoa(JSON.stringify({ sub: userId, iat: Math.floor(Date.now() / 1000) }));
  return `${header}.${payload}.mock`;
};

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400)); // 로딩 효과

  const user = MOCK_USERS.find(
    (u) => u.email === payload.email && u.password === payload.password,
  );

  if (!user) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  return {
    userId: user.id,
    accessToken: makeMockToken(user.id),
    user: { id: user.id, email: user.email, name: user.name },
  };
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const exists = MOCK_USERS.some((u) => u.email === payload.email);
  if (exists) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  const newId = `user-${MOCK_USERS.length + 1}`;
  MOCK_USERS.push({ id: newId, email: payload.email, password: payload.password, name: payload.name });

  return {
    userId: newId,
    accessToken: makeMockToken(newId),
    user: { id: newId, email: payload.email, name: payload.name },
  };
}
