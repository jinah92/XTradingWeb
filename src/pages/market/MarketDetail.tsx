import { useParams } from 'react-router-dom';

import { CurrencyCard } from '../../components/card/CurrencyCard';
import { TradingChart } from '../../components/chart/markets/TradingChart';

const MarketDetail = () => {
  const params = useParams();

  return (
    <>
      <h1>{params?.marketId}</h1>
      <div className="p-10">
        <TradingChart market={params?.marketId!} />
      </div>
      <CurrencyCard market={params?.marketId!} />
    </>
  );
};
export default MarketDetail;
