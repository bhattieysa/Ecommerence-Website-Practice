export function hasItems<T>(items: readonly T[]): boolean {
  return items.length > 0;
}

export function getItemCount<T>(items: readonly T[]): number {
  return items.length;
}
