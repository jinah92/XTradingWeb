import { NewsModel } from './model';

import type { CointelgraphItem, MkItem, NewsViewModelImpl } from '@/entities/news/types';

class NewsViewModel implements NewsViewModelImpl {
  rss: NewsModel;

  constructor(data: MkItem | CointelgraphItem) {
    this.rss = new NewsModel(data);
  }

  get sumbnail() {
    const media = this.rss.media;
    if (media) {
      return media['@_medium'] === 'image' ? media['@_url'] : '';
    }
    return '';
  }

  get title() {
    return this.rss.title;
  }

  get description() {
    return this.rss.description;
  }

  get link() {
    return this.rss.link;
  }
}

export class MkNewsViewModel extends NewsViewModel {}

export class CointelegrpahNewsViewModel extends NewsViewModel {
  get description() {
    return this.parseDescription(this.rss.description);
  }

  parseDescription(data: string) {
    return data.replace(/<p[^>]*>|<\/p>|<img[^>]*>/gi, '');
  }
}

export class CoindeskNewsViewModel extends NewsViewModel {
  get sumbnail() {
    const media = this.rss.media;
    if (media) {
      return media?.['@_type']?.includes('image') ? media['@_url'] : '';
    }
    return '';
  }
}
