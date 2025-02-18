import { MarketCandleViewModel } from '../../services/market/view-models';

export enum MarketCandleInterval {
  'SEC' = 'seconds',
  'MIN' = 'minutes',
  'DAY' = 'days',
  'WEEK' = 'weeks',
  'MONTH' = 'months',
  'YEAR' = 'years',
}

export type ISODateString = string;
export type MarketCandleRange = '1D' | '7D' | '1M' | '3M';
export type MarketCandleMap = Map<MarketCandleRange, MarketCandleViewModel>;

export interface MarketCandle {
  market: string;
  interval: (typeof MarketCandleInterval)[keyof typeof MarketCandleInterval];
  to?: ISODateString;
  count?: number;
  unit?: number;
  range?: MarketCandleRange;
}

export const TotalCountsForMinutes: { [key in MarketCandleRange]: number } = {
  '1D': 12 * 24,
  '7D': 4 * 24 * 7,
  '1M': 1 * 24 * 30,
  '3M': 1 * 6 * 30 * 3,
};

export const MinUnitsForRange: { [key in MarketCandleRange]: number } = {
  '1D': 5,
  '7D': 15,
  '1M': 60,
  '3M': 240,
};

export const MAX_COUNT = 200;
