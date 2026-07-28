export function createProduct({ id, sku, slug, title, description, brand, category, image, imageAlt, currentPrice, originalPrice, rating, reviewCount, badge, stockQuantity = 100, inStock = true, flags = {}, }) {
    return {
        id,
        sku,
        slug,
        title,
        description,
        brand,
        category,
        image: {
            src: image,
            alt: imageAlt ?? title,
        },
        price: {
            current: currentPrice,
            original: originalPrice,
            currency: 'USD',
        },
        rating: {
            value: rating,
            reviewCount,
        },
        badge,
        inStock,
        stockQuantity,
        flags,
    };
}
