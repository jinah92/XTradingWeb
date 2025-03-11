import { myPageRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const myPageRoute: RouteObject = {
  path: myPageRoutePaths.main.path,
  async lazy() {
    const MyPage = await import('@/pages/mypage/MyPage');
    return { Component: MyPage.default };
  },
};
