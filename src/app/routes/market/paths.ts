import { MarketEntity } from '@/entities';

const { marketSegments } = MarketEntity;

export const marketRoutePaths = {
  market: {
    path: 'market',
    fullPath: '/market',
  },
  marketDetail: {
    path: `market/${marketSegments.marketName}`,
    fullPath: `market/${marketSegments.marketName}`,
  },
};
