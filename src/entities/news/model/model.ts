import type { CointelgraphItem, MkItem, NewsModelImpl } from '@/entities/news/types';

export class NewsModel implements NewsModelImpl {
  constructor(private readonly rawdata: MkItem | CointelgraphItem) {}

  get title() {
    return this.rawdata.title;
  }
  get description() {
    return this.rawdata.description;
  }
  get publishedDate() {
    return this.rawdata.pubDate;
  }
  get link() {
    return this.rawdata.link;
  }
}
