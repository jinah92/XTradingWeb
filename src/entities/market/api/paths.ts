const prefix = {
  v1: '/upbit-api/v1',
} as const;

export const marketSegments = {
  marketName: ':marketName',
};

export const upbitPaths = {
  markets: `${prefix.v1}/market/all`,
  candles: `${prefix.v1}/candles`,
  candlesByMinute: `${prefix.v1}/candles/minutes`,
  ticker: `${prefix.v1}/ticker?markets=${marketSegments.marketName}`,
} as const;
