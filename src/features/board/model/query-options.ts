import { infiniteQueryOptions, type UseMutationOptions } from '@tanstack/react-query';

import { BoardEntity } from '@/entities';
import { queryClient } from '@/shared';

import type { CreateBoardRequest, CreateFeedRequest } from '@/entities/board/types';

export const options = {
  rootKey: 'board',
  getIdeaList: (size: number) =>
    infiniteQueryOptions({
      queryKey: [options.rootKey, 'ideaList'],
      queryFn: ({ pageParam }) => BoardEntity.boardService.getIdeas({ pageNumber: pageParam, pageSize: size }),
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage.nextPage,
    }),
  getFeedList: (size: number, type?: string, code?: string) =>
    infiniteQueryOptions({
      queryKey: [options.rootKey, 'feedList'],
      queryFn: ({ pageParam }) =>
        BoardEntity.boardService.getFeeds({ type, code, pageNumber: pageParam, pageSize: size }),
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage.nextPage,
    }),
  selectIdeaListPage: (size: number) =>
    infiniteQueryOptions({
      ...options.getIdeaList(size),
      select: data => ({
        pages: data.pages.flatMap(idea => idea.items),
        pageParams: data.pageParams,
      }),
    }),
  selectFeedListPage: (size: number, type?: string, code?: string) =>
    infiniteQueryOptions({
      ...options.getFeedList(size, type, code),
      select: data => ({
        pages: data.pages.flatMap(feed => feed.items),
        pageParams: data.pageParams,
      }),
    }),
  postIdea: () =>
    ({
      mutationKey: [options.rootKey, 'idea', 'create'],
      mutationFn: (idea: CreateBoardRequest) => BoardEntity.boardService.createIdea(idea),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.rootKey, 'ideaList'] }),
    }) as UseMutationOptions<any, Error, CreateBoardRequest>,
  postFeed: () =>
    ({
      mutationKey: [options.rootKey, 'feed', 'create'],
      mutationFn: (feed: CreateFeedRequest) => BoardEntity.boardService.createFeed(feed),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.rootKey, 'feedList'] }),
    }) as UseMutationOptions<any, Error, CreateFeedRequest>,
};
