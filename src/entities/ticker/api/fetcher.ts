import { apiWithoutAuth } from '@shared';

import type { UpbitTickerResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findMarketTicker = async (market: string) => {
  const { data }: AxiosResponse<UpbitTickerResponse[]> = await apiWithoutAuth.get(`/upbit-api/v1/ticker`, {
    params: {
      markets: market,
    },
  });

  return data;
};
