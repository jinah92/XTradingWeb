import { apiWithAuth } from '@shared';

import type { MemberBaseInfoResponse, NicknameExistResponse, NicknameUpdateResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findMemberInfo = async (userId: string) => {
  const { data }: AxiosResponse<MemberBaseInfoResponse> = await apiWithAuth.get(`/api/members/${userId}/base-info`);

  return data.result;
};

export const createMemberBlock = async (userId: string) => {
  await apiWithAuth.post(`/api/members/toggle-block`, { userId: userId });

  return true;
};

export const findMemberNicknameExists = async (nickname: string) => {
  const { data }: AxiosResponse<NicknameExistResponse> = await apiWithAuth.get(
    `/api/my-page/nick-name/exist?nickName=${nickname}`,
  );

  return data;
};

export const putMemberNickname = async (userId: string, nickName: string) => {
  const { data }: AxiosResponse<NicknameUpdateResponse> = await apiWithAuth.post(`/api/my-page/nick-name?nickName`, {
    userId,
    nickName,
  });

  return data;
};
