import { UpbitMarketCandleResponse } from '../../apis/market';
import { timeToLocal } from '../../lib/date';

export class MarketCandleViewModel {
  data: UpbitMarketCandleResponse[];

  constructor(data: UpbitMarketCandleResponse[]) {
    this.data = data;
  }

  getData() {
    return this.data.map(item => this.toChart(item));
  }

  get length() {
    return this.data.length;
  }

  get firstDate() {
    return this.data?.[0].candle_date_time_kst;
  }

  toChart(data: UpbitMarketCandleResponse) {
    return {
      time: timeToLocal(new Date(data.candle_date_time_kst).getTime()),
      open: data.opening_price,
      high: data.high_price,
      low: data.low_price,
      close: data.trade_price,
    };
  }

  addData(data: UpbitMarketCandleResponse[]) {
    this.data = [...data, ...this.data];
  }
}
