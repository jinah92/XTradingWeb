import { apiWithoutAuth, urlReplace } from '@shared';

import { upbitPaths, ticketSegments } from './paths';

import type { UpbitTickerResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findMarketTicker = async (marketName: string) => {
  const { data }: AxiosResponse<UpbitTickerResponse[]> = await apiWithoutAuth.get(
    urlReplace(upbitPaths.ticker, [[ticketSegments.marketName, marketName]]),
  );

  return data;
};
