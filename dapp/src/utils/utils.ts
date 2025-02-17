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

export function formatISODatetoString(date = '2023-12-05T00:36:06.278Z') {
  const parsedDate = new Date(date).toDateString();
  const [, month, day, year] = parsedDate.split(' ');
  return `${month} ${day}, ${year}`;
}

export function formatISODatetoDashSeparatedDateString(
  date = '2023-12-05T00:36:06.278Z'
) {
  const parsedDate = new Date(date);

  return `${
    parsedDate.getDate() < 10
      ? `0${parsedDate.getDate()}`
      : parsedDate.getDate()
  }-${
    parsedDate.getMonth() + 1 < 10
      ? `0${parsedDate.getMonth() + 1}`
      : parsedDate.getMonth() + 1
  }-${parsedDate.getFullYear()}`;
}
