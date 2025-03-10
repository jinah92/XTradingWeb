import { apiWithAuth, apiWithoutAuth, type ApiResponse, type Pagination } from '@/shared';

import type {
  CreateFeedRequest,
  CreateBoardRequest,
  CreatedBoardResponse,
  FeedListResponse,
  IdeaListResponse,
  CreatedFeedResponse,
} from '@/entities/board/types';

export const findIdeas = async ({ pageNumber: page, pageSize }: Pagination) => {
  const { data } = await apiWithoutAuth.get<ApiResponse<IdeaListResponse>>(`/api/boards`, {
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
  const { data } = await apiWithoutAuth.get<ApiResponse<FeedListResponse>>(`/api/feeds`, {
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
  const { data } = await apiWithAuth.post<ApiResponse<CreatedBoardResponse>>(`/api/boards`, newData);

  return data.result;
};

export const createFeed = async (newData: CreateFeedRequest) => {
  const { data } = await apiWithAuth.post<ApiResponse<CreatedFeedResponse>>(`/api/feeds`, newData);

  return data.result;
};
