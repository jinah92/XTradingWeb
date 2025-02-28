import { apiWithAuth, type ApiResponse } from '@shared';

import type { NicknameExist, UserBaseInfo } from '../types';

export const findMemberInfo = async (userId: string) => {
  const { data } = await apiWithAuth.get<ApiResponse<UserBaseInfo>>(`/api/members/${userId}/base-info`);

  return data.result;
};

export const createMemberBlock = async (userId: string) => {
  await apiWithAuth.post(`/api/members/toggle-block`, { userId: userId });

  return true;
};

export const findMemberNicknameExists = async (nickname: string) => {
  const { data } = await apiWithAuth.get<ApiResponse<NicknameExist>>(
    `/api/my-page/nick-name/exist?nickName=${nickname}`,
  );

  return data;
};

export const putMemberNickname = async (userId: string, nickName: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(`/api/my-page/nick-name?nickName`, {
    userId,
    nickName,
  });

  return data;
};
