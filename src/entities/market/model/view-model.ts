import { timeToLocal } from '@/shared/lib';

import { MarketModel } from './model';

import type { MarketViewModelImpl, TradingData, UpbitMarketCandleResponse } from '../types';

export class MarketViewModel implements MarketViewModelImpl {
  model: MarketModel[];
  constructor(data: UpbitMarketCandleResponse[]) {
    this.model = data.map(candle => new MarketModel(candle));
  }

  get data() {
    return this.model.map(item => this.#toChart(item));
  }

  get length() {
    return this.model.length;
  }

  get firstDate() {
    return this.model?.[0].kstTime;
  }

  #toChart(data: MarketModel) {
    return {
      time: timeToLocal(new Date(data.kstTime).getTime()),
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
    } as TradingData;
  }

  addData(data: MarketModel[]) {
    this.model = [...data, ...this.model];
  }
}
