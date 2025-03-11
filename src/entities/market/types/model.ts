import type { UpbitMarketCandleResponse } from './schema';

export interface MarketModelImpl {
  get kstTime(): UpbitMarketCandleResponse['candle_date_time_kst'];
  get utcTime(): UpbitMarketCandleResponse['candle_date_time_utc'];
  get open(): UpbitMarketCandleResponse['opening_price'];
  get close(): UpbitMarketCandleResponse['trade_price'];
  get high(): UpbitMarketCandleResponse['high_price'];
  get low(): UpbitMarketCandleResponse['low_price'];
}
