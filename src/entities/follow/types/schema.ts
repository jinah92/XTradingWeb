import type { UserInfo } from '@/entities/member/types';

export interface FollowerInfo extends Pick<UserInfo, 'userId' | 'userGrade' | 'profilePicUrl'> {
  name: string;
}

export interface FollowersResponse {
  followers: FollowerInfo[];
}

export interface FolloweesResponse {
  followings: FollowerInfo[];
}
