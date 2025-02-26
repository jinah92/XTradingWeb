export interface TickerModelImpl {
  get changePrice(): number;
  get signedChangePrice(): number;
  get volume(): number;
  get volume24h(): number;
}
