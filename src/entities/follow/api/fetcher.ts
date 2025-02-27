import { apiWithAuth } from '@shared';

import type { FollowersResponse, FolloweesResponse, UpdateFollowerResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findFollowers = async () => {
  const { data }: AxiosResponse<FollowersResponse> = await apiWithAuth.get(`/api/my-page/followers`);

  return data.result.followers;
};

export const findFollowees = async () => {
  const { data }: AxiosResponse<FolloweesResponse> = await apiWithAuth.get(`/api/my-page/followings`);

  return data.result.followings;
};

// 팔로우
export const createFollowerMember = async (userId: string) => {
  const params = {
    targetId: userId,
  };
  const { data }: AxiosResponse<UpdateFollowerResponse> = await apiWithAuth.post(`/api/my-page/follow`, params);

  return data.result;
};

// 언팔로우
export const createUnfollowerMember = async (userId: string) => {
  const params = {
    targetId: userId,
  };
  const { data }: AxiosResponse<UpdateFollowerResponse> = await apiWithAuth.post(`/api/my-page/unfollow`, params);

  return data.result;
};
