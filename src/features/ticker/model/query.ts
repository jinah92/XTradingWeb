import { useQuery } from '@tanstack/react-query';

import { options } from './query-options';

export const useMarketTickerQuery = (market: string) => useQuery(options.getMarketTicker(market));
