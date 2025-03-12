import { apiWithoutAuth, urlReplace } from '@shared';

import { marketSegments, upbitPaths } from './paths';

import type { MarketCandle, UpbitMarketCandleResponse, UpbitTicker, UpbitTickerResponse } from '../types';
import type { AxiosResponse } from 'axios';

export const findMarkets = async () => {
  const { data }: AxiosResponse<UpbitTicker[]> = await apiWithoutAuth.get(upbitPaths.markets);

  return data;
};

export const findMarketCandles = async ({ market, to, count, interval }: MarketCandle) => {
  const { data }: AxiosResponse<UpbitMarketCandleResponse[]> = await apiWithoutAuth.get(
    `${upbitPaths.candles}/${interval}`,
    {
      params: {
        market,
        count,
        to,
      },
    },
  );

  return data;
};

export const findMarketCandlesWithUnit = async ({ market, to, count, unit }: Omit<MarketCandle, 'interval'>) => {
  const { data }: AxiosResponse<UpbitMarketCandleResponse[]> = await apiWithoutAuth.get(
    `${upbitPaths.candlesByMinute}/${unit}`,
    {
      params: {
        market,
        count,
        to,
      },
    },
  );

  return {
    data,
    initTime: new Date(data[data.length - 1].candle_date_time_kst).toISOString(),
  };
};

export const findMarketTicker = async (marketName: string) => {
  const { data }: AxiosResponse<UpbitTickerResponse[]> = await apiWithoutAuth.get(
    urlReplace(upbitPaths.ticker, [[marketSegments.marketName, marketName]]),
  );

  return data;
};
