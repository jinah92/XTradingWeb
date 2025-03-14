import type { FollowerInfo } from '@/entities/my-page/types';

export interface MemberViewModelImpl {
  getFollowers(): FollowerInfo[];
  getFollowees(): FollowerInfo[];
}
