import { CurrencyUnit, CurrencyUnitType, NumberScales } from '../app/const/currency';

export const currencyFormatter = (
  currency: number,
  decimalPlaces: number = 2,
  showNumericalScales: boolean = true,
  unit: CurrencyUnitType = 'en',
) => {
  if (!currency) return '';
  let result = '';
  const abs = Math.abs(currency);
  if (showNumericalScales) {
    // unit 표현
    if (abs >= 1_000_000_000_000) {
      result += `${Number((currency / 1_000_000_000_000).toFixed(decimalPlaces)).toLocaleString()}${NumberScales.trillion}`;
    } else if (abs >= 1_000_000_000) {
      result += `${Number((currency / 1_000_000_000).toFixed(decimalPlaces)).toLocaleString()}${NumberScales.billion}`;
    } else if (abs >= 1_000_000) {
      result += `${Number((currency / 1_000_000).toFixed(decimalPlaces)).toLocaleString()}${NumberScales.million}`;
    } else if (abs >= 1_000) {
      result += `${Number((currency / 1_000).toFixed(decimalPlaces)).toLocaleString()}${NumberScales.thousand}`;
    } else {
      const round = Number(currency.toFixed(decimalPlaces));
      result += round === 0 ? 0 : round.toLocaleString();
    }
  }
  return `${CurrencyUnit?.[unit]}${result}`;
};

export const percentFormatter = (decimal: number) => `${Math.round((decimal || 0) * 100) / 100}%`;
