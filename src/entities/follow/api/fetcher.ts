import { apiWithAuth, type ApiResponse } from '@shared';

import { followPaths } from './paths';

import type { FollowersResponse, FolloweesResponse, NicknameExist } from '../types';

export const findFollowers = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FollowersResponse>>(followPaths.followers);

  return data.result.followers;
};

export const findFollowees = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FolloweesResponse>>(followPaths.followees);

  return data.result.followings;
};

// 팔로우
export const createFollowerMember = async (userId: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(followPaths.follow, {
    targetId: userId,
  });

  return data.result;
};

// 언팔로우
export const createUnfollowerMember = async (userId: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(followPaths.unfollow, {
    targetId: userId,
  });

  return data.result;
};

export const findMemberNicknameExists = async (nickName: string) => {
  const { data } = await apiWithAuth.get<ApiResponse<NicknameExist>>(followPaths.checkNicknameExist, {
    params: {
      nickName,
    },
  });

  return data;
};

export const putMemberNickname = async (userId: string, nickName: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(followPaths.updateNickname, {
    userId,
    nickName,
  });

  return data;
};
