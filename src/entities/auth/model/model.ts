import type { UserAuthInfo } from '@/entities/auth/types';
import type { AuthModelImpl } from '@/entities/auth/types';

export class AuthModel implements AuthModelImpl {
  constructor(private readonly rawdata: UserAuthInfo) {}

  get userId() {
    return this.rawdata.userRes.userId;
  }
  get accessToken() {
    return this.rawdata.accessToken;
  }
  get refreshToken() {
    return this.rawdata.refreshTokenKey;
  }
  get email() {
    return this.rawdata.userRes.email;
  }
  get userName() {
    return this.rawdata.userRes.nickName;
  }
  get profileUrl() {
    return this.rawdata.userRes.profilePicUrl;
  }
  get userGrade() {
    return this.rawdata.userRes.userGrade;
  }
  get summary() {
    return this.rawdata.userRes.activitySummary;
  }
}
