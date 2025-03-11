import { apiWithAuth, type ApiResponse } from '@shared';

import type { FollowersResponse, FolloweesResponse } from '../types';

export const findFollowers = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FollowersResponse>>(`/api/my-page/followers`);

  return data.result.followers;
};

export const findFollowees = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FolloweesResponse>>(`/api/my-page/followings`);

  return data.result.followings;
};

// 팔로우
export const createFollowerMember = async (userId: string) => {
  const params = {
    targetId: userId,
  };
  const { data } = await apiWithAuth.post<ApiResponse<string>>(`/api/my-page/follow`, params);

  return data.result;
};

// 언팔로우
export const createUnfollowerMember = async (userId: string) => {
  const params = {
    targetId: userId,
  };
  const { data } = await apiWithAuth.post<ApiResponse<string>>(`/api/my-page/unfollow`, params);

  return data.result;
};
