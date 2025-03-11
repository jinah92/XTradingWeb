import { interestRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const interestRoute: RouteObject = {
  path: interestRoutePaths.interest.path,
  async lazy() {
    const InterestPage = await import('@/pages/interest/Interest');
    return { Component: InterestPage.default };
  },
};
