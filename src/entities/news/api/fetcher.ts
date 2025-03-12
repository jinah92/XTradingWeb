import { apiWithoutAuth, xmlParser } from '@/shared';

import { newsPaths } from './paths';

import type { Channel, MkItem, CointelgraphItem } from '@/entities/news/types';

export const getMkRss = async () => {
  const response = await apiWithoutAuth.get(newsPaths.getMkNews);

  return xmlParser.parse(response.data) as Channel<MkItem>;
};

export const getCointelegraphRss = async () => {
  const response = await apiWithoutAuth.get(newsPaths.getCointelegraph);

  return xmlParser.parse(response.data) as Channel<CointelgraphItem>;
};
