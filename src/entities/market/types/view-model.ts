import type { MarketModel } from '../model';
import type { TradingData } from './schema';
import type { ISODateString } from '@/app/const/common';

interface TickerPrice {
  changePrice: number;
  signedChangePrice: number;
  volume: number;
  volume24h: number;
}

export interface MarketViewModelImpl {
  get data(): TradingData[];
  get length(): number;
  get firstDate(): ISODateString;
  addData(params: MarketModel[]): void;
}

export interface MarketTickerViewModelImpl {
  get ticker(): { price: TickerPrice };
}
