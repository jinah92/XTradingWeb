import { queryOptions, useQuery } from '@tanstack/react-query';
import { MarketService } from '../services';
import { MarketType } from '../apis/market';

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
};

export const useSelectMarketsQuery = (marketType: MarketType) => useQuery(options.selectFilteredMarkets(marketType));
