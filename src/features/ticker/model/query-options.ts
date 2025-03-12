import { queryOptions } from '@tanstack/react-query';

import { MarketEntity } from '@/entities';

export const options = {
  rootKey: 'ticker',
  getMarketTicker: (market: string) =>
    queryOptions({
      queryKey: [options.rootKey, market],
      queryFn: () => MarketEntity.marketService.getMarketTicker(market),
    }),
};
