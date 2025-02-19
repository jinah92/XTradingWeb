export type CurrencyUnitType = 'ko' | 'en';

export enum NumberScales {
  'thousand' = 'K',
  'million' = 'M',
  'billion' = 'G',
  'trillion' = 'T',
}

export const CurrencyUnit: { [key in CurrencyUnitType]: string } = {
  en: '$',
  ko: '₩',
};
