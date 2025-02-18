import { queryOptions, useQuery } from '@tanstack/react-query';
import { MarketService } from '../services';
import { MarketType } from '../apis/market';
import { MarketCandle, MarketCandleRange } from '../app/const/market';

const options = {
  rootKey: 'upbit',
  getMarkets: () =>
    queryOptions({
      queryKey: [options.rootKey, 'market'],
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
    }),
};

export const useSelectMarketsQuery = (marketType: MarketType) => useQuery(options.selectFilteredMarkets(marketType));

export const useMarketCandlesMinuteQuery = (market: string, range: MarketCandleRange) =>
  useQuery(options.getMarketCandlesWithUnit({ market, range }));
