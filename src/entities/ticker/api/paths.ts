const prefix = {
  v1: '/upbit-api/v1',
} as const;

export const ticketSegments = {
  marketName: ':marketName',
};

export const upbitPaths = {
  ticker: `${prefix.v1}/ticker?markets=${ticketSegments.marketName}`,
} as const;
