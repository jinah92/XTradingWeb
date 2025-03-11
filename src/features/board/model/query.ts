import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { options } from './query-options';

export const useSelectIdeaListInfiniteQuery = (size: number) => useInfiniteQuery(options.selectIdeaListPage(size));

export const useSelectFeedListInfiniteQuery = (size: number, type?: string, code?: string) =>
  useInfiniteQuery(options.selectFeedListPage(size, type, code));

export const useAddIdeaMutation = () => useMutation(options.postIdea());

export const useAddFeedMutation = () => useMutation(options.postFeed());
