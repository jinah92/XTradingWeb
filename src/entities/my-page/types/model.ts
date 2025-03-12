import type { FollowerInfo } from './schema';

export interface FollowerModelImpl {
  get id(): FollowerInfo['userId'];
  get profileUrl(): FollowerInfo['profilePicUrl'];
  get nickname(): FollowerInfo['name'];
  get grade(): FollowerInfo['userGrade'];
}
