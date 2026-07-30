export function calculateDiscountPercentage(
  price: number,
  originalPrice?: number,
): number | null {
  if (!originalPrice || originalPrice <= price) {
    return null;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
