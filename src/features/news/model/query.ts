import { useQuery } from '@tanstack/react-query';

import { options } from './query-options';

import type { NewsType } from '@/entities/news/types';

export const useNewsRss = (newsType: NewsType) => useQuery(options.getRss(newsType));
