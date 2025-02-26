import { queryOptions, useQuery } from '@tanstack/react-query';

import { TickerEntity } from '@/entities';

const options = {
  rootKey: 'ticker',
  getMarketTicker: (market: string) =>
    queryOptions({
      queryKey: [options.rootKey, market, 'ticker'],
      queryFn: () => TickerEntity.tickerService.getMarketTicker(market),
    }),
};

export const useMarketTickerQuery = (market: string) => useQuery(options.getMarketTicker(market));
