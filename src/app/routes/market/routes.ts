import { marketRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const marketRoute: RouteObject[] = [
  {
    path: marketRoutePaths.market.path,
    async lazy() {
      const MarketPage = await import('@/pages/market/market');
      return { Component: MarketPage.default };
    },
  },
  {
    path: marketRoutePaths.marketDetail.path,
    async lazy() {
      const MarketDetailPage = await import('@/pages/market/MarketDetail');
      return { Component: MarketDetailPage.default };
    },
  },
];
