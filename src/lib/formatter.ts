export const currencyFormatter = (
  currency: number,
  decimalPlaces?: number,
  units?: { K: string; M: string; B: string; G: string },
) => {
  if (!currency) return '';
  if (units) {
    // unit 표현
    if (currency >= 1_000_000_000_000) {
      return `${(currency / 1_000_000_000_000).toFixed(decimalPlaces)}${units.G}`;
    } else if (currency >= 1_000_000_000) {
      return `${(currency / 1_000_000_000).toFixed(decimalPlaces)}${units.B}`;
    } else if (currency >= 1_000_000) {
      return `${(currency / 1_000_000).toFixed(decimalPlaces)}${units.M}`;
    } else if (currency >= 1_000) {
      return `${(currency / 1_000).toFixed(decimalPlaces)}${units.K}`;
    } else {
      return currency.toString();
    }
  }
  if (decimalPlaces)
    // 소숫점 자리 표현
    return `$${parseFloat(currency?.toFixed(decimalPlaces)).toLocaleString()}`;
  return `$${currency?.toLocaleString()}`;
};
