import type { FollowerInfo } from '@/entities/follow/types';

export interface MemberViewModelImpl {
  getFollowers(): FollowerInfo[];
  getFollowees(): FollowerInfo[];
}
