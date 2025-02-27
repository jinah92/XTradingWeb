import { apiWithAuth } from '@shared';

import type { FollowersResponse, FolloweesResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findFollowers = async () => {
  const { data }: AxiosResponse<FollowersResponse> = await apiWithAuth.get(`/api/my-page/followers`);

  return data.result.followers;
};

export const findFollowees = async () => {
  const { data }: AxiosResponse<FolloweesResponse> = await apiWithAuth.get(`/api/my-page/followings`);

  return data.result.followings;
};
