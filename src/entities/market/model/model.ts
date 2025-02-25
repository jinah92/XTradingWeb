import type { MarketModelImpl, UpbitMarketCandleResponse } from '../types';

export class MarketModel implements MarketModelImpl {
  constructor(private readonly rawData: UpbitMarketCandleResponse) {}

  get kstTime() {
    return this.rawData.candle_date_time_kst;
  }
  get utcTime() {
    return this.rawData.candle_date_time_utc;
  }
  get open() {
    return this.rawData.opening_price;
  }
  get close() {
    return this.rawData.trade_price;
  }
  get high() {
    return this.rawData.high_price;
  }
  get low() {
    return this.rawData.low_price;
  }
}
