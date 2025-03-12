import { NewsViewModel } from '@/entities/news/model/view-model';

import { NewsRepository } from '../api';

import type { NewsType } from '@/entities/news/types';

export class NewsService {
  constructor(private respository: typeof NewsRepository) {
    this.respository = respository;
  }

  async getNewsRss(newsType: NewsType) {
    if (newsType === 'mk') return new NewsViewModel(await this.respository.getMkRss());
    if (newsType === 'coin-telegraph') return new NewsViewModel(await this.respository.getCointelegraphRss());
  }
}

export default new NewsService(NewsRepository);
