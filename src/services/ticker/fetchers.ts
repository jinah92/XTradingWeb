import { TickerRepository } from '../../apis';
import { MarketTickerViewModel } from './view-models';

class TickerService {
  private repository: typeof TickerRepository;

  constructor(repository: typeof TickerRepository) {
    this.repository = repository;
  }

  async getMarketTicker(market: string) {
    const data = await this.repository.findMarketTicker(market);

    return new MarketTickerViewModel(data?.[0]);
  }
}

export default new TickerService(TickerRepository);
