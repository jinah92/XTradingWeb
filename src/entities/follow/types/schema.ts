import type { UserInfo } from '@/entities/member/types';

export interface FollowerInfo extends Pick<UserInfo, 'userId' | 'userGrade' | 'profilePicUrl'> {
  name: string;
}

export interface FollowersResponse {
  message: string;
  result: {
    followers: FollowerInfo[];
  };
}

export interface FolloweesResponse {
  message: string;
  result: {
    followings: FollowerInfo[];
  };
}
