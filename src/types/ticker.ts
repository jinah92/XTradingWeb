type PriceChange = 'RISE' | 'EVEN' | 'FALL';

export interface UpbitTicker {
  code?: string;
  trade_price?: number;
  prev_closing_price?: number;
  change?: PriceChange;
  change_rate?: number;
  signed_change_rate?: number;
  acc_trade_volume_24h?: number;
  acc_trade_price_24h?: number;
}

export type ChartUpbitTicker = Partial<UpbitTicker>;
