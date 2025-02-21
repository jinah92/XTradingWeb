import type { AxiosResponse } from 'axios';
import type { UpbitTickerResponse } from './model';
import { apiWithoutAuth } from '@shared';

export const findMarketTicker = async (market: string) => {
  const { data }: AxiosResponse<UpbitTickerResponse[]> = await apiWithoutAuth.get(`/upbit-api/v1/ticker`, {
    params: {
      markets: market,
    },
  });

  return data;
};
