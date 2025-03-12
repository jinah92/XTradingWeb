import { useParams } from 'react-router-dom';

import { CurrencyCard } from '../../components/card/CurrencyCard';
import { TradingChart } from '../../components/chart/markets/TradingChart';

const MarketDetail = () => {
  const params = useParams();

  return (
    <>
      <h1>{params?.marketName}</h1>
      <div className="p-10">
        <TradingChart market={params?.marketName!} />
      </div>
      <CurrencyCard market={params?.marketName!} />
    </>
  );
};
export default MarketDetail;
