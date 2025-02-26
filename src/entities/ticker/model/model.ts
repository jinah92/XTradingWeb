import type { TickerModelImpl, UpbitTickerResponse } from '../types';

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
