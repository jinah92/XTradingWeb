import { currencyFormatter } from '@shared/lib';

import { useMarketTickerQuery } from '../../queries/ticker';
import SignedNumberTypo from '../typography/SignedNumberTypo';

export const CurrencyCard = ({ market }: { market: string }) => {
  const { data } = useMarketTickerQuery(market);

  const prices = data?.getTickerData().price;

  return (
    <div className="flex justify-center gap-5">
      <h1>
        Price Change : <SignedNumberTypo data={prices?.signedChangePrice!} formatter={currencyFormatter} />
      </h1>
      <h1>Price Volume : {currencyFormatter(prices?.volume!)}</h1>
      <h1>Price Volume(24 hours) : {currencyFormatter(prices?.volume24h!)}</h1>
    </div>
  );
};
