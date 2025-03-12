const prefix = {
  v1: '/upbit-api/v1',
} as const;

export const marketSegments = {
  marketId: ':marketId',
};

export const upbitPaths = {
  markets: `${prefix.v1}/market/all`,
  candles: `${prefix.v1}/candles`,
  candlesByMinute: `${prefix.v1}/candles/minutes`,
} as const;
