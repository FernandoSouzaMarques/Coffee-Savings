type Locale = 'en' | 'pt-BR';

export function formatCurrency(value: number, locale: Locale = "en"): string {
  const format = {
    "en": 'USD',
    "pt-BR": 'BRL',
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency: format[locale] }).format(value);
}
