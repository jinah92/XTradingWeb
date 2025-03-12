import type { MarketModelImpl, TickerModelImpl, UpbitMarketCandleResponse, UpbitTickerResponse } from '../types';

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

export class TickerModel implements TickerModelImpl {
  constructor(private readonly rawData: UpbitTickerResponse) {}

  get changePrice() {
    return this.rawData.change_price;
  }
  get signedChangePrice() {
    return this.rawData.signed_change_price;
  }
  get volume() {
    return this.rawData.acc_trade_volume;
  }
  get volume24h() {
    return this.rawData.acc_trade_price_24h;
  }
}
