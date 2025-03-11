import { apiWithoutAuth, type ApiResponse } from '@/shared';

import type { LoginParamsByEmail, UserAuthInfo } from '@/entities/auth/types';

export const authEmailLogin = async (params: LoginParamsByEmail) => {
  const { data } = await apiWithoutAuth.post<ApiResponse<UserAuthInfo>>(`/api/auth/login`, params);

  return data.result;
};
