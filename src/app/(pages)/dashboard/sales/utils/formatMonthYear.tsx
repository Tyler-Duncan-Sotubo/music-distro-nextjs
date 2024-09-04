export const formatMonthYear = (monthYear: string): string => {
  const [year, month] = monthYear.split("-");
  const date = new Date(parseInt(year!), parseInt(month ?? "0") - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};
