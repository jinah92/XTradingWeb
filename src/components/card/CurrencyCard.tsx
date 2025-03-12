import { currencyFormatter } from '@shared/lib';

import { MarketFeature } from '@/features';

import SignedNumberTypo from '../typography/SignedNumberTypo';

export const CurrencyCard = ({ market }: { market: string }) => {
  const { data } = MarketFeature.useMarketTickerQuery(market);

  const prices = data?.ticker.price;

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
