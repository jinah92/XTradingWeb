import { timeToLocal } from '@/shared/lib';

import { MarketModel } from './model';

import type {
  MarketTickerViewModelImpl,
  MarketViewModelImpl,
  TradingData,
  UpbitMarketCandleResponse,
  UpbitTickerResponse,
} from '../types';

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

export class TickerViewModel implements MarketTickerViewModelImpl {
  data: UpbitTickerResponse;
  constructor(data: UpbitTickerResponse) {
    this.data = data;
  }

  get ticker() {
    return {
      price: {
        changePrice: this.data.change_price,
        signedChangePrice: this.data.signed_change_price,
        volume: this.data.acc_trade_volume,
        volume24h: this.data.acc_trade_volume_24h,
      },
    };
  }
}
