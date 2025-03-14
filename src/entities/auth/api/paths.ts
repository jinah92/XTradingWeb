const prefix = {
  v1: '/api/auth',
} as const;

export const authPaths = {
  loginByEmail: `${prefix.v1}/login`,
} as const;
