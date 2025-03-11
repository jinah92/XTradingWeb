export const NumberScales = {
  thousand: 'K',
  million: 'M',
  billion: 'G',
  trillion: 'T',
} as const;

type CurrencyUnitType = 'ko' | 'en';
export const CurrencyUnit: { [key in CurrencyUnitType]: string } = {
  en: '$',
  ko: '₩',
} as const;
