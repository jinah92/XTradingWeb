import { MarketRepository } from '../../apis';

class MarketService {
  repository: typeof MarketRepository;

  constructor(repository: typeof MarketRepository) {
    this.repository = repository;
  }

  async getMarkets() {
    const markets = await this.repository.findMarkets();
    return markets;
  }
}

export default new MarketService(MarketRepository);
