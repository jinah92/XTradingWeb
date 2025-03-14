import { homeRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const homeRoute: RouteObject = {
  path: homeRoutePaths.home.path,
  async lazy() {
    const HomePage = await import('@/pages/Home');
    return { Component: HomePage.default };
  },
};
