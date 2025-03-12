import { apiWithAuth, apiWithoutAuth, type ApiResponse, type Pagination } from '@/shared';

import { boardPaths } from './paths';

import type {
  CreateFeedRequest,
  CreateBoardRequest,
  CreatedBoardResponse,
  FeedListResponse,
  IdeaListResponse,
  CreatedFeedResponse,
} from '@/entities/board/types';

export const findIdeas = async ({ pageNumber: page, pageSize }: Pagination) => {
  const { data } = await apiWithoutAuth.get<ApiResponse<IdeaListResponse>>(boardPaths.ideas, {
    params: {
      page,
      pageSize,
    },
  });

  return data.result;
};

export const findFeeds = async ({
  type,
  code,
  pageNumber: page,
  pageSize,
}: Pagination & { type?: string; code?: string }) => {
  const { data } = await apiWithoutAuth.get<ApiResponse<FeedListResponse>>(boardPaths.feeds, {
    params: {
      type,
      code,
      page,
      pageSize,
    },
  });

  return data.result;
};

export const createIdea = async (newData: CreateBoardRequest) => {
  const { data } = await apiWithAuth.post<ApiResponse<CreatedBoardResponse>>(boardPaths.ideas, newData);

  return data.result;
};

export const createFeed = async (newData: CreateFeedRequest) => {
  const { data } = await apiWithAuth.post<ApiResponse<CreatedFeedResponse>>(boardPaths.feeds, newData);

  return data.result;
};
