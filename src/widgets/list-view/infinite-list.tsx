import { useEffect, useRef } from 'react';

import { useInView } from 'framer-motion';

import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface InfiniteListWidgetProps<T> {
  query: UseInfiniteQueryResult<InfiniteData<T, number>, Error>;
  renderItem: (item: T, index: number) => JSX.Element;
}

export const InfiniteListTemplate = <T,>({ query, renderItem }: InfiniteListWidgetProps<T>) => {
  const { data, error, isError, hasNextPage, isFetchNextPageError, fetchNextPage } = query;

  if (isError && !isFetchNextPageError) {
    throw error;
  }

  const ref = useRef(null);
  const isInView = useInView(ref);

  const fetchError = error as unknown as AxiosError;

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isFetchNextPageError) {
      throw new Error(fetchError?.message);
    }
  }, [fetchError, isFetchNextPageError]);

  return (
    <>
      <ul className="h-auto w-auto">{data?.pages?.map((page, index) => renderItem(page, index))}</ul>
      <div ref={ref} className="h-2" />
    </>
  );
};
