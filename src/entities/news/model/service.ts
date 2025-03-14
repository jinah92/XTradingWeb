import { CoindeskNewsViewModel, CointelegrpahNewsViewModel, MkNewsViewModel } from '@/entities/news/model/view-model';

import { NewsRepository } from '../api';

import type { CointelgraphItem, MkItem, NewsType, XmlParseFormat } from '@/entities/news/types';

export class NewsService {
  constructor(private respository: typeof NewsRepository) {
    this.respository = respository;
  }

  async getNewsRss(newsType: NewsType) {
    let result: (MkItem | CointelgraphItem)[];
    if (newsType === 'mk') {
      result = this.filterRss(await this.respository.getMkRss());
      return this.toViewModels(result, newsType);
    }
    if (newsType === 'coindesk') {
      result = this.filterRss(await this.respository.getCoindeskRss());
      return this.toViewModels(result, newsType);
    }
    if (newsType === 'cointelegraph') {
      result = this.filterRss(await this.respository.getCointelegraphRss());
      return this.toViewModels(result, newsType);
    }
  }

  filterRss(data: XmlParseFormat<MkItem | CointelgraphItem>) {
    return data.rss.channel.item;
  }

  toViewModels(data: (MkItem | CointelgraphItem)[], newsType: NewsType) {
    if (newsType === 'mk') return (data as MkItem[]).map(news => new MkNewsViewModel(news));
    if (newsType === 'coindesk') return (data as CointelgraphItem[]).map(news => new CoindeskNewsViewModel(news));
    if (newsType === 'cointelegraph')
      return (data as CointelgraphItem[]).map(news => new CointelegrpahNewsViewModel(news));
  }
}

export default new NewsService(NewsRepository);
