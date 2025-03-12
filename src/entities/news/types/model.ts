import type { NewsItem } from '@/entities/news/types/schema';

export interface NewsModelImpl {
  get title(): NewsItem['title'];
  get description(): NewsItem['description'];
  get publishedDate(): NewsItem['pubDate'];
  get link(): NewsItem['link'];
}
