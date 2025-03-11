interface TickerPrice {
  changePrice: number;
  signedChangePrice: number;
  volume: number;
  volume24h: number;
}

export interface MarketTickerViewModelImpl {
  get ticker(): { price: TickerPrice };
}
