import { AxiosResponse } from 'axios';
import axiosInstance from '../../configs/axios/axiosConfig';
import { UpbitTickerResponse } from './model';

export const findMarketTicker = async (market: string) => {
  const { data }: AxiosResponse<UpbitTickerResponse[]> = await axiosInstance.get(`/upbit-api/v1/ticker`, {
    params: {
      markets: market,
    },
  });

  return data;
};
