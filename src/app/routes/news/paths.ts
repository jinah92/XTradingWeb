import { NewsEntity } from '@/entities';

const { newsSegments } = NewsEntity;

export const newsRoutePaths = {
  news: {
    path: 'news',
    fullPath: 'news',
  },
  newsWithSegment: {
    path: `news/${newsSegments.newsId}`,
    fullPath: `news/${newsSegments.newsId}`,
  },
};
