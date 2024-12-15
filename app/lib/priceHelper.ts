export function formatPrice(input: string) {
  // Remove commas if the input is a string
  const sanitizedInput =
    typeof input === "string" ? input.replace(/,/g, "") : input;
  // Convert to number and divide by 100
  const price = (Number(sanitizedInput) / 100).toFixed(2);
  return `£${price}`;
}
