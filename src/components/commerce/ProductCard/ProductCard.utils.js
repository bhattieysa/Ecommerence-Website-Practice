export function hasDiscount(price, originalPrice) {
    return originalPrice !== undefined && originalPrice > price;
}
export function getDiscountPercentage(price, originalPrice) {
    if (!hasDiscount(price, originalPrice)) {
        return 0;
    }
    return Math.round(((originalPrice - price) / originalPrice) * 100);
}
export function hasRating(rating, reviewCount) {
    return rating !== undefined && reviewCount !== undefined && reviewCount > 0;
}
export function hasBadge(product) {
    return Boolean(product.badge?.trim());
}
export function isInStock(product) {
    return product.inStock ?? true;
}
