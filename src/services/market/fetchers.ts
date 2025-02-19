import { MarketCandleViewModel } from './view-models';
import { MarketRepository } from '../../apis';
import { UpbitMarketCandleResponse } from '../../apis/market';
import { MarketCandle, MAX_COUNT, TotalCountsForMinutes, MinUnitsForRange } from '../../app/const/market';

import { splitValue } from '../../lib/utils';

class MarketService {
  repository: typeof MarketRepository;

  constructor(repository: typeof MarketRepository) {
    this.repository = repository;
  }

  async getMarkets() {
    const markets = await this.repository.findMarkets();
    return markets;
  }

  // 분 단위(unit)로 마켓 캔들을 가져오는 메서드
  // 현재 시간을 기준으로 24시간동안의 데이터를 모두 가져옴
  async getMarketCandlesWithUnit(props: Pick<MarketCandle, 'market' | 'range'>) {
    // 조회 기간에 따라 분 단위를 내부에서 조절해서 계산
    // 조회 기간 : 1일(5분봉), 7일(15분봉), 1달(60분봉), 3달(240분봉)
    const unit = MinUnitsForRange[props.range!];
    const count = splitValue(TotalCountsForMinutes[props.range!], MAX_COUNT);
    const data = await this.getMarketData(props.market, unit, count);

    return new MarketCandleViewModel(data);
  }

  // 한번 캔들을 가져올때 최대 200개씩 가져온다. (counts 배열에 가져올 count를 각 요소 최대 200개씩)
  async getMarketData(market: string, unit: number, counts: number[]) {
    let time = new Date().toISOString();
    const totalCandles: UpbitMarketCandleResponse[] = [];

    for await (const count of counts) {
      const { data, initTime } = await this.repository.findMarketCandlesWithUnit({ market, unit, to: time, count });
      totalCandles.unshift(...data.reverse());
      time = initTime;
    }

    return totalCandles;
  }
}

export default new MarketService(MarketRepository);
