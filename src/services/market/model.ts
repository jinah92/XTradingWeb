import type { TradingData } from '../../apis/market';

export class TradingModel {
  constructor(private readonly data: TradingData) {}

  get time() {
    return this.data.time;
  }

  get open() {
    return this.data.open;
  }

  get high() {
    return this.data.high;
  }

  get low() {
    return this.data.low;
  }

  get close() {
    return this.data.close;
  }
}
