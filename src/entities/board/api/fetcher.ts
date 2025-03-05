import { apiWithoutAuth, type ApiResponse, type Pagination } from '@/shared';

import type { FeedListResponse, IdeaListResponse } from '@/entities/board/types';

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
}: Pagination & { type: string; code: string }) => {
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
