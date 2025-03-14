import { apiWithoutAuth, xmlParser } from '@/shared';

import { newsPaths } from './paths';

import type { MkItem, CointelgraphItem, XmlParseFormat } from '@/entities/news/types';

export const getMkRss = async () => {
  const response = await apiWithoutAuth.get(newsPaths.getMkNews);

  return xmlParser.parse(response.data) as XmlParseFormat<MkItem>;
};

export const getCointelegraphRss = async () => {
  const response = await apiWithoutAuth.get(newsPaths.getCointelegraph);

  return xmlParser.parse(response.data) as XmlParseFormat<CointelgraphItem>;
};

export const getCoindeskRss = async () => {
  const response = await apiWithoutAuth.get(newsPaths.getCoindeskNews);

  return xmlParser.parse(response.data) as XmlParseFormat<CointelgraphItem>;
};
