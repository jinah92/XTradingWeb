import { useQuery } from '@tanstack/react-query';

import { options } from './query-options';

import type { MarketType, MarketCandleRange } from '@shared';

export const useSelectMarketsQuery = (marketType: MarketType) => useQuery(options.selectFilteredMarkets(marketType));

export const useMarketCandlesMinuteQuery = (market: string, range: MarketCandleRange) =>
  useQuery(options.getMarketCandlesWithUnit({ market, range }));

export const useMarketTickerQuery = (market: string) => useQuery(options.getMarketTicker(market));
