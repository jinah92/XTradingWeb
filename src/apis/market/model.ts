type PriceChange = 'RISE' | 'EVEN' | 'FALL';

export type MarketType = 'KRW' | 'BTC' | 'USDT';

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
