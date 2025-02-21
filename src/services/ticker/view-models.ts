import { TickerModel } from './model';

import type { UpbitTickerResponse } from '../../apis/ticker';

export class MarketTickerViewModel {
  data: TickerModel;

  constructor(data: UpbitTickerResponse) {
    this.data = new TickerModel(data);
  }

  getTickerData() {
    return { price: { ...this.data.prices } };
  }
}
