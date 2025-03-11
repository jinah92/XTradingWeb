import { MemeberModel } from './model.ts';

import type { MemberViewModelImpl, UserInfo } from './../types';

export class MemberViewModel implements MemberViewModelImpl {
  model: MemeberModel;

  constructor(data: UserInfo) {
    this.model = new MemeberModel(data);
  }
  getFollowers() {
    return this.model.followers;
  }
  getFollowees() {
    return this.model.followees;
  }
  getInfo() {
    return {
      nickname: this.model.nickname,
      email: this.model.email,
      profile: this.model.profileUrl,
    };
  }
}
