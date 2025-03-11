import { queryOptions } from '@tanstack/react-query';

import { MarketEntity } from '@/entities';

import type { MarketType, MarketCandleRange } from '@shared';

export const options = {
  rootKey: 'market',
  getMarkets: () =>
    queryOptions({
      queryKey: [options.rootKey],
      queryFn: () => MarketEntity.marketService.getMarkets(),
    }),
  selectFilteredMarkets: (type: MarketType) =>
    queryOptions({
      ...options.getMarkets(),
      select: data => {
        if (type === 'ALL') return data;
        return data.filter(item => new RegExp(`^${type}*`).test(item.market));
      },
    }),
  getMarketCandlesWithUnit: (props: { market: string; range: MarketCandleRange }) =>
    queryOptions({
      queryKey: [options.rootKey, props.market, props.range],
      queryFn: () => MarketEntity.marketService.getMarketCandlesWithUnit(props),
      gcTime: 0,
    }),
};
