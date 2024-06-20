export function formatAmount(
  amount: string | number | undefined,
  currency?: '₦' | '$' | string
) {
  if (!amount) return undefined;

  amount = amount.toString();

  // Remove any non-digit characters
  const cleanAmount = removeNonDigit(amount);

  return `${currency ? `${currency} ` : ''}${
    cleanAmount
      ? parseFloat(cleanAmount).toLocaleString('en-us', {
          maximumFractionDigits: 2,
        })
      : ''
  }`;
}

export function removeNonDigit(amount: string) {
  // Remove any non-digit characters
  if (!amount) return '';

  return amount.replace(/[^0-9.]/g, '');
}
