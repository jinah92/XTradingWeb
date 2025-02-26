import { TickerRepository } from '../api';
import { TickerViewModel } from '../model';

class TickerService {
  private repository: typeof TickerRepository;

  constructor(repository: typeof TickerRepository) {
    this.repository = repository;
  }

  async getMarketTicker(market: string) {
    const data = await this.repository.findMarketTicker(market);

    return new TickerViewModel(data?.[0]);
  }
}

export default new TickerService(TickerRepository);
