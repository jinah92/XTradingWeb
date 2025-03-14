const prefix = {
  v1: '/api/my-page',
} as const;

export const myPagePaths = {
  followers: `${prefix.v1}/followers`,
  followees: `${prefix.v1}/followings`,
  follow: `${prefix.v1}/follow`,
  unfollow: `${prefix.v1}/unfollow`,
  checkNicknameExist: `${prefix.v1}/nick-name/exist`,
  updateNickname: `${prefix.v1}/nick-name?nickName`,
} as const;
