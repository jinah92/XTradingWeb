import { UpbitTickerResponse } from '../../apis/ticker';
import { TickerModel } from './model';

export class MarketTickerViewModel {
  data: TickerModel;

  constructor(data: UpbitTickerResponse) {
    this.data = new TickerModel(data);
  }

  getTickerData() {
    return { price: { ...this.data.prices } };
  }
}
