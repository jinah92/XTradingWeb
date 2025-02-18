import { Time } from 'lightweight-charts';

type PriceChange = 'RISE' | 'EVEN' | 'FALL';

export type MarketType = 'KRW' | 'BTC' | 'USDT' | 'ALL';

interface MarketEvent {
  warning: boolean;
  caution: object;
}

export interface UpbitTicker {
  code?: string;
  korean_name?: string;
  english_name?: string;
  trade_price?: number;
  prev_closing_price?: number;
  change?: PriceChange;
  change_rate?: number;
  signed_change_rate?: number;
  acc_trade_volume_24h?: number;
  acc_trade_price_24h?: number;
}

export interface UpbitTicker {
  market: string;
  market_event: MarketEvent;
}

export interface UpbitMarketCandleResponse {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

// day
export interface UpbitMarketShortTermCandleResponse extends UpbitMarketCandleResponse {
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
  converted_trade_price: number;
}

// week, month, year
export interface UpbitMarketLongTermCandleResponse extends UpbitMarketCandleResponse {
  first_day_of_period: string;
}

export interface TradingData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}
