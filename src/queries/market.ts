import { queryOptions, useQuery } from '@tanstack/react-query';

import { MarketService } from '../services';

import type { MarketType } from '../apis/market';
import type { MarketCandle, MarketCandleRange } from '../app/const/market';

const options = {
  rootKey: 'market',
  getMarkets: () =>
    queryOptions({
      queryKey: [options.rootKey],
      queryFn: () => MarketService.getMarkets(),
    }),
  selectFilteredMarkets: (type: MarketType) =>
    queryOptions({
      ...options.getMarkets(),
      select: data => {
        if (type === 'ALL') return data;
        return data.filter(item => new RegExp(`^${type}*`).test(item.market));
      },
    }),
  getMarketCandlesWithUnit: (props: Pick<MarketCandle, 'market' | 'range'>) =>
    queryOptions({
      queryKey: [options.rootKey, props.market, props.range],
      queryFn: () => MarketService.getMarketCandlesWithUnit(props),
      gcTime: 0,
    }),
};

export const useSelectMarketsQuery = (marketType: MarketType) => useQuery(options.selectFilteredMarkets(marketType));

export const useMarketCandlesMinuteQuery = (market: string, range: MarketCandleRange) =>
  useQuery(options.getMarketCandlesWithUnit({ market, range }));
