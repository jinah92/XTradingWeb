import { queryOptions } from '@tanstack/react-query';

import { NewsEntity } from '@/entities';

import type { NewsType } from '@/entities/news/types';

export const options = {
  rootKey: 'news',
  getRss: (newsType: NewsType) =>
    queryOptions({
      queryKey: [options.rootKey, newsType],
      queryFn: () => NewsEntity.newsService.getNewsRss(newsType),
    }),
};
