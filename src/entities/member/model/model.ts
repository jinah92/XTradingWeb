import type { MemberModelImpl, UserInfo } from '../types';

export class MemeberModel implements MemberModelImpl {
  constructor(private readonly rawdata: UserInfo) {}

  get nickname() {
    return this.rawdata.nickName;
  }
  get profileUrl() {
    return this.rawdata.profilePicUrl;
  }
  get email() {
    return this.rawdata.email;
  }
  get grade() {
    return this.rawdata.userGrade;
  }
  get followers() {
    return this.rawdata.followers;
  }
  get followees() {
    return this.rawdata.followees;
  }
}
