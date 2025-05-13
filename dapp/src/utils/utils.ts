export function formatAmount(
  amount: string | number | undefined,
  currency?: '₦' | '$' | string
) {
  if (!amount) return undefined;

  amount = amount.toString();

  // Remove any non-digit characters
  const cleanAmount = removeNonDigit(amount);

  if (cleanAmount.endsWith('.')) {
    // Keep the trailing decimal for partial input like "123."
    return `${currency ? `${currency} ` : ''}${cleanAmount}`;
  }

  return `${currency ? `${currency} ` : ''}${
    cleanAmount
      ? parseFloat(cleanAmount).toLocaleString('en-us', {
          maximumFractionDigits: 2,
        })
      : ''
  }`;
}

export function removeNonDigit(amount: string) {
  // Allow numbers and at most one decimal point
  const validAmount = amount
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\./g, '$1');

  // Prevent truncating input like "123."
  if (validAmount.endsWith('.')) return validAmount;

  // Restrict to two decimal places
  const [integerPart, decimalPart] = validAmount.split('.');
  if (decimalPart && decimalPart.length > 2) {
    return `${integerPart}.${decimalPart.substring(0, 2)}`;
  }
  return validAmount;
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

export function testPassword(
  test: 'uppercase' | 'lowercase' | 'special' | 'number' | 'length',
  password: string,
  length?: number
) {
  const regex =
    test === 'lowercase'
      ? /[a-z]/
      : test === 'uppercase'
      ? /[A-Z]/
      : test === 'number'
      ? /\d/
      : test === 'length'
      ? new RegExp(`^.{${length},}$`)
      : /[^\w\d.]/;

  return regex.test(password);
}
