import { apiWithoutAuth, type ApiResponse } from '@/shared';

import { authPaths } from './paths';

import type { LoginParamsByEmail, UserAuthInfo } from '@/entities/auth/types';

export const authEmailLogin = async ({ email, password, autoLogin }: LoginParamsByEmail) => {
  const { data } = await apiWithoutAuth.post<ApiResponse<UserAuthInfo>>(authPaths.loginByEmail, {
    email,
    password,
    autoLogin,
  });

  return data.result;
};
