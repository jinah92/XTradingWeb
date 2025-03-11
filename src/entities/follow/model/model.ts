import type { FollowerInfo, FollowerModelImpl } from '../types';

export class FollowerModel implements FollowerModelImpl {
  constructor(private readonly rawdata: FollowerInfo) {}

  get id() {
    return this.rawdata.userId;
  }
  get profileUrl() {
    return this.rawdata.profilePicUrl;
  }
  get nickname() {
    return this.rawdata.name;
  }
  get grade() {
    return this.rawdata.userGrade;
  }
}
