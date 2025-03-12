import { myPagePaths } from '@/entities/my-page';
import { apiWithAuth, type ApiResponse } from '@/shared';

import type { NicknameExist } from '@/entities/my-page/types';

export const findMemberNicknameExists = async (nickName: string) => {
  const { data } = await apiWithAuth.get<ApiResponse<NicknameExist>>(myPagePaths.checkNicknameExist, {
    params: {
      nickName,
    },
  });

  return data;
};

export const putMemberNickname = async (userId: string, nickName: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(myPagePaths.updateNickname, {
    userId,
    nickName,
  });

  return data;
};
