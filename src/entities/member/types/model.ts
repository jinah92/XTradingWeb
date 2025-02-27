import type { UserInfo } from './schema';

export interface MemberModelImpl {
  get nickname(): UserInfo['nickName'];
  get profileUrl(): UserInfo['profilePicUrl'];
  get email(): UserInfo['email'];
  get grade(): UserInfo['userGrade'];
  get followers(): UserInfo['followers'];
  get followees(): UserInfo['followees'];
}
