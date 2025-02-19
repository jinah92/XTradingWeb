import { CurrencyUnit, CurrencyUnitType, NumberScales } from '../app/const/currency';

export const currencyFormatter = (
  currency: number,
  decimalPlaces: number = 2,
  showNumericalScales: boolean = true,
  unit: CurrencyUnitType = 'en',
) => {
  if (!currency) return '';
  let result = '';
  if (showNumericalScales) {
    // unit 표현
    if (currency >= 1_000_000_000_000) {
      result += `${(currency / 1_000_000_000_000).toFixed(decimalPlaces)}${NumberScales.trillion}`;
    } else if (currency >= 1_000_000_000) {
      result += `${(currency / 1_000_000_000).toFixed(decimalPlaces)}${NumberScales.billion}`;
    } else if (currency >= 1_000_000) {
      result += `${(currency / 1_000_000).toFixed(decimalPlaces)}${NumberScales.million}`;
    } else if (currency >= 1_000) {
      result += `${(currency / 1_000).toFixed(decimalPlaces)}${NumberScales.thousand}`;
    } else {
      result += currency.toFixed(2).toString();
    }
  }
  return `${CurrencyUnit[unit]}${result}`;
};

export const percentFormatter = (decimal: number) => `${Math.round((decimal || 0) * 100) / 100}%`;
