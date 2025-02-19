import { UpbitTickerResponse } from '../../apis/ticker';

export class TickerModel {
  constructor(private readonly data: UpbitTickerResponse) {}

  get prices() {
    return {
      changePrice: this.data.change_price,
      signedChangePrice: this.data.signed_change_price,
      volume: this.data.acc_trade_volume,
      volume24h: this.data.acc_trade_volume_24h,
    };
  }
}
