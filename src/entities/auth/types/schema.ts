import type { UserInfo } from '@/entities/member/types';

type AuthType = 'EMAIL' | 'GOOGLE' | 'APPLE';

export interface UserAuthInfo {
  refreshTokenKey: string;
  accessToken: string;
  userRes: Pick<UserInfo, 'userId' | 'email' | 'nickName' | 'profilePicUrl' | 'userGrade'> & {
    profile: string;
    authType: AuthType;
    autoLogin: 'Y' | 'N';
    activitySummary: string;
  };
}

export interface LoginParamsByEmail {
  email: string;
  password: string;
  autoLogin: 'Y' | 'N';
}
