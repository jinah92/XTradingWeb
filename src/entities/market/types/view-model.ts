import type { MarketModel } from '../model';
import type { TradingData } from './schema';
import type { ISODateString } from '@/app/const/common';

export interface MarketViewModelImpl {
  get data(): TradingData[];
  get length(): number;
  get firstDate(): ISODateString;
  addData(params: MarketModel[]): void;
}
