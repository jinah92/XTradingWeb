import { apiWithAuth, urlReplace, type ApiResponse } from '@shared';

import { membersPaths, membersSegments } from './paths';

import type { UserBaseInfo } from '../types';

export const findMemberInfo = async (userId: string) => {
  const { data } = await apiWithAuth.get<ApiResponse<UserBaseInfo>>(
    urlReplace(membersPaths.memberById, [[membersSegments.memberId, userId]]),
  );

  return data.result;
};

export const createMemberBlock = async (userId: string) => {
  await apiWithAuth.post(membersPaths.userBlockToggle, { userId: userId });

  return true;
};
