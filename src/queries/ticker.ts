import { queryOptions, useQuery } from '@tanstack/react-query';

import { TickerService } from '../services';

const options = {
  rootKey: 'ticker',
  getMarketTicker: (market: string) =>
    queryOptions({
      queryKey: [options.rootKey, market, 'ticker'],
      queryFn: () => TickerService.getMarketTicker(market),
    }),
};

export const useMarketTickerQuery = (market: string) => useQuery(options.getMarketTicker(market));
