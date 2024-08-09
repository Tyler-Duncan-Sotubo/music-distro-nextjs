export function formatNumberWithCommas(number: number | undefined): string {
  return "₦" + (number ?? 0).toLocaleString("en-US");
}
