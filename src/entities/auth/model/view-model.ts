import { AuthModel } from '@/entities/auth/model/model';

import type { AuthViewModelImpl, UserAuthInfo } from '@/entities/auth/types';

export class AuthViewModel implements AuthViewModelImpl {
  model: AuthModel;

  constructor(data: UserAuthInfo) {
    this.model = new AuthModel(data);
  }
  toUserStateParams() {
    return {
      email: this.model.email,
      userId: this.model.userId,
      userName: this.model.userName,
      userGrade: this.model.userGrade,
      accessToken: this.model.accessToken,
      refreshToken: this.model.refreshToken,
    };
  }
}
