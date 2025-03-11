import type { UserGrade } from '@/entities/member/types';

export interface UserState {
  email: string;
  userId: string;
  userName: string;
  userGrade: UserGrade;
  accessToken: string;
  refreshToken: string;
}

export interface AuthViewModelImpl {
  toUserStateParams(): UserState;
}
