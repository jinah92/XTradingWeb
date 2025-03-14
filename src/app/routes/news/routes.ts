import { newsRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const newsRoute: RouteObject[] = [
  {
    path: newsRoutePaths.news.path,
    async lazy() {
      const NewsPage = await import('@/pages/news/News');
      return { Component: NewsPage.default };
    },
  },
  {
    path: newsRoutePaths.newsWithSegment.path,
    async lazy() {
      const NewsPage = await import('@/pages/news/News');
      return { Component: NewsPage.default };
    },
  },
];
