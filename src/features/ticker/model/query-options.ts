import { queryOptions } from '@tanstack/react-query';

import { TickerEntity } from '@/entities';

export const options = {
  rootKey: 'ticker',
  getMarketTicker: (market: string) =>
    queryOptions({
      queryKey: [options.rootKey, market],
      queryFn: () => TickerEntity.tickerService.getMarketTicker(market),
    }),
};
