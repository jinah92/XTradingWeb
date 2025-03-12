import { NewsModel } from './model';

import type { Channel, CointelgraphItem, MkItem } from '@/entities/news/types';

export class NewsViewModel {
  channel: NewsModel[];

  constructor(data: Channel<MkItem | CointelgraphItem>) {
    this.channel = data.item.map(channelData => new NewsModel(channelData));
  }
}
