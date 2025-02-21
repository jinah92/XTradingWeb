import type { Time } from 'lightweight-charts';

export type PriceChange = 'RISE' | 'EVEN' | 'FALL';

export type MarketType = 'KRW' | 'BTC' | 'USDT' | 'ALL';

export interface RawUpbitMarketData {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number; // utc-time 0:00 기준
  change: PriceChange;
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number; // utc-time 0:00 기준
  acc_trade_price_24h: number;
  acc_trade_volume: number; // utc-time 0:00 기준
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: number;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

interface UbitMarketCandle {
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

export interface UpbitMarketCandleResponse
  extends Pick<
      RawUpbitMarketData,
      'market' | 'opening_price' | 'high_price' | 'low_price' | 'trade_price' | 'timestamp'
    >,
    UbitMarketCandle {}

// day
export interface UpbitMarketShortTermCandleResponse
  extends Pick<
      RawUpbitMarketData,
      | 'market'
      | 'opening_price'
      | 'high_price'
      | 'low_price'
      | 'trade_price'
      | 'timestamp'
      | 'prev_closing_price'
      | 'change_price'
      | 'change_rate'
    >,
    UbitMarketCandle {
  converted_trade_price: number;
}

// week, month, year
export interface UpbitMarketLongTermCandleResponse
  extends Pick<
      RawUpbitMarketData,
      'market' | 'opening_price' | 'high_price' | 'low_price' | 'trade_price' | 'timestamp'
    >,
    UbitMarketCandle {
  first_day_of_period: string;
}

export interface TradingData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}
