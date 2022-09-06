const formatCurrency = (number) => new Intl.NumberFormat('de-AT', {
  style: 'currency',
  currency: 'EUR',
  maximumSignificantDigits: 10
}).format(number);

export { formatCurrency };