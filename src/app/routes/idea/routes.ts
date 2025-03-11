import { ideaRoutePaths } from './paths';

import type { RouteObject } from 'react-router-dom';

export const ideaRoute: RouteObject[] = [
  {
    path: ideaRoutePaths.ideas.path,
    async lazy() {
      const IdeaListPage = await import('@/pages/idea/idea-list-page');
      return { Component: IdeaListPage.default };
    },
  },
  {
    path: ideaRoutePaths.feeds.path,
    async lazy() {
      const FeedListPage = await import('@/pages/idea/feed-list-page');
      return { Component: FeedListPage.default };
    },
  },
];
