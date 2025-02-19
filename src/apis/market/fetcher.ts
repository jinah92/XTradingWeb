import axiosInstance from '../../configs/axios/axiosConfig';
import type { AxiosResponse } from 'axios';
import type { UpbitMarketCandleResponse } from './model';
import { MarketCandle } from '../../app/const/market';
import { UpbitTicker } from '../ticker';

export const findMarkets = async () => {
  const { data }: AxiosResponse<UpbitTicker[]> = await axiosInstance.get(`upbit-api/v1/market/all`);

  return data;
};

export const findMarketCandles = async ({ market, to, count, interval }: MarketCandle) => {
  const { data }: AxiosResponse<UpbitMarketCandleResponse[]> = await axiosInstance.get(
    `/upbit-api/v1/candles/${interval}`,
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
  const { data }: AxiosResponse<UpbitMarketCandleResponse[]> = await axiosInstance.get(
    `/upbit-api/v1/candles/minutes/${unit}`,
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
