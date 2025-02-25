import type { MarketCandleRange } from '../types';

export enum MarketCandleInterval {
  'SEC' = 'seconds',
  'MIN' = 'minutes',
  'DAY' = 'days',
  'WEEK' = 'weeks',
  'MONTH' = 'months',
  'YEAR' = 'years',
}

export const TotalCandleCountByMinutes: { [key in MarketCandleRange]: number } = {
  '1D': 12 * 24,
  '7D': 4 * 24 * 7,
  '1M': 1 * 24 * 30,
  '3M': 1 * 6 * 30 * 3,
} as const;

export const CandleUnitsByRange: { [key in MarketCandleRange]: number } = {
  '1D': 5,
  '7D': 15,
  '1M': 60,
  '3M': 240,
} as const;

export const MaxCandleCount = 200;
