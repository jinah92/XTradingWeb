import type { MarketTickerViewModelImpl, UpbitTickerResponse } from '../types';

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
