/**
 * Converts an ISO date string to a human-readable date format.
 * @param {string} isoDateString - The ISO date string (e.g., '2024-08-01T17:07:43.709Z').
 * @returns {string} - The formatted date string (e.g., 'Thu Aug 01 2024').
 */
export function convertIsoDateString(
  isoDateString: string | number | Date | undefined,
): string {
  // Convert the ISO string to a Date object
  if (isoDateString === undefined) {
    throw new Error("Invalid ISO date string");
  }
  const dateObj = new Date(isoDateString);

  // Check if the date conversion was successful
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  // Return the formatted date string
  return dateObj.toDateString();
}
