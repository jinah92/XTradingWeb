export interface AuthModelImpl {
  get userId(): string;
  get email(): string;
  get userName(): string;
  get profileUrl(): string;
  get userGrade(): string;
  get summary(): string;
  get accessToken(): string;
  get refreshToken(): string;
}
