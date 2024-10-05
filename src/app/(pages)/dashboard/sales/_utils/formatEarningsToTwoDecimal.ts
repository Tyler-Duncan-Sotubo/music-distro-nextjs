export const formatEarnings = (value: number | string): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    throw new Error("Invalid value for earnings.");
  }

  // Convert to a string with two decimal places
  const formattedValue = numericValue.toFixed(2);
  // Add comma as thousands separator
  const [integerPart, decimalPart] = formattedValue.split(".");
  const withCommas = (integerPart ?? "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `£${withCommas}.${decimalPart}`;
};
