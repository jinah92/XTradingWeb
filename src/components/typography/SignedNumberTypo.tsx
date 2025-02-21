import { CurrencyUnit, type CurrencyUnitType } from '../../app/const/currency';
import { cn } from '../../lib/utils';

interface SignedNumberTypoProps {
  data: number;
  unit?: CurrencyUnitType;
  formatter?: (data: number) => string;
}

const SignedNumberTypo = ({ data, unit, formatter }: SignedNumberTypoProps) => {
  const round = Number(data?.toFixed(2));

  return (
    <span className={cn(round > 0 && 'text-green-700', round < 0 && 'text-red-700')}>
      {unit && CurrencyUnit[unit]}
      {formatter?.(data) ?? data}
    </span>
  );
};

export default SignedNumberTypo;
