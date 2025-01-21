import { UpbitTicker } from '../../types/ticker';

export const UPBIT_URL = import.meta.env.VITE_WS_UPBIT_URL;
export const UPBIT_TICKER_MESSAGE = [
  { ticket: 'test' },
  { type: 'ticker', codes: ['KRW-BTC', 'KRW-ETH', 'KRW-ETC', 'KRW-NEO', 'KRW-MTL', 'KRW-XRP', 'KRW-SNT', 'KRW-WAVES'] },
];
export const COIN_LIST: UpbitTicker[] = [
  { code: 'KRW-BTC' },
  { code: 'KRW-ETH' },
  { code: 'KRW-ETC' },
  { code: 'KRW-NEO' },
  { code: 'KRW-MTL' },
  { code: 'KRW-XRP' },
  { code: 'KRW-SNT' },
  { code: 'KRW-WAVES' },
];
