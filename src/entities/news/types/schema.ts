export type NewsType = 'mk' | 'coin-telegraph';

export interface NewsItem {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}

export interface CointelgraphItem extends NewsItem {
  'dc:creator': string;
  enclouse: { '@_length': string; '@_type': string; '@_url': string };
  guid: { '@_isPermaLink': string; '#text': string };
  'media:content': { '@_medium': string; '@_url': string };
}

export interface Channel<T> {
  description: string;
  item: T[];
  lastBuildDate: string;
  title: string;
}

export interface MkItem extends NewsItem {
  author: string;
  category: string;
  no: number;
}
