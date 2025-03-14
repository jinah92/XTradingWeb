export type NewsType = 'mk' | 'coindesk' | 'cointelegraph';

export interface NewsItem {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  'media:content': { '@_medium': string; '@_url': string; '@_type'?: string };
}

export interface CointelgraphItem extends NewsItem {
  'dc:creator': string;
  enclouse: { '@_length': string; '@_type': string; '@_url': string };
  guid: { '@_isPermaLink': string; '#text': string };
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

export interface XmlParseFormat<T> {
  '?xml': { '@_version': string; '@_encoding': string };
  rss: {
    '@_version': string;
    '@_xmlns:atom': string;
    '@_xmlns:dc': string;
    '@_xmlns:media': string;
    '@_xmlns:nyt': string;
    channel: Channel<T>;
  };
}
