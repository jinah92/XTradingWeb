import { myPagePaths } from '@/entities/my-page';
import { apiWithAuth, type ApiResponse } from '@/shared';

import type { FolloweesResponse, FollowersResponse } from '@/entities/my-page/types';

export const findFollowers = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FollowersResponse>>(myPagePaths.followers);

  return data.result.followers;
};

export const findFollowees = async () => {
  const { data } = await apiWithAuth.get<ApiResponse<FolloweesResponse>>(myPagePaths.followees);

  return data.result.followings;
};

// 팔로우
export const createFollowerMember = async (userId: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(myPagePaths.follow, {
    targetId: userId,
  });

  return data.result;
};

// 언팔로우
export const createUnfollowerMember = async (userId: string) => {
  const { data } = await apiWithAuth.post<ApiResponse<string>>(myPagePaths.unfollow, {
    targetId: userId,
  });

  return data.result;
};
