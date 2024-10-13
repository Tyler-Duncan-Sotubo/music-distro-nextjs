export function formatNumberWithCommas(number: number | undefined): string {
  if (number === undefined) {
    return "";
  }

  const currencySymbol = number.toString().length === 2 ? "$" : "₦";
  return currencySymbol + number.toLocaleString("en-US");
}
