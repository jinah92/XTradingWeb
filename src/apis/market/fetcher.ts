import axiosInstance from '../../configs/axios/axiosConfig';
import type { AxiosResponse } from 'axios';
import type { UpbitTicker } from './model';

export const findMarkets = async () => {
  const { data }: AxiosResponse<UpbitTicker[]> = await axiosInstance.get(`upbit-api/v1/market/all`);

  return data;
};
