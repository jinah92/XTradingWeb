import type { FollowerInfo } from '@/entities/my-page/types';

export type UserGrade = 'BEGINNER' | 'NOVICE' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | 'MASTER' | 'MAESTRO';

export interface UserInfo {
  userId: string;
  boardCount: number;
  email: string;
  followerCount: number;
  followingCount: number;
  nickName: string; // name 프로퍼티와 동일. 프로퍼티명 통일 필요
  profilePicUrl: string;
  reputationScore: number;
  userGrade: UserGrade;
  youAreFollowing: boolean;
  youBlock: boolean;
  followers: FollowerInfo[];
  followees: FollowerInfo[];
}

export interface UserBaseInfo extends Omit<UserInfo, 'userId' | 'followers' | 'followees'> {}
