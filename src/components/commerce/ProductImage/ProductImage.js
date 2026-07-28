import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { ProductImageVariants } from '@/components/commerce/ProductImage/ProductImageVariants';
import { ProductImageFallback } from '@/components/commerce/ProductImage/ProductImageFallback';
import { getFetchPriority, getImageLoading, resolveImageSource, hasValidImageSource, objectFitClasses, } from '@/components/commerce/ProductImage/ProductImage.utils';
export function ProductImage({ src, alt, fallbackSrc, fallback, priority = false, aspectRatio, radius, objectFit = 'cover', className, ...props }) {
    const [hasError, setHasError] = useState(false);
    const imageSrc = resolveImageSource(src, fallbackSrc);
    const shouldShowFallback = hasError || !imageSrc;
    if (shouldShowFallback) {
        return (_jsx("div", { className: ProductImageVariants({
                aspectRatio,
                radius,
                className,
            }), children: fallback ?? _jsx(ProductImageFallback, { alt: alt }) }));
    }
    return (_jsx("div", { className: ProductImageVariants({
            aspectRatio,
            radius,
            className,
        }), children: _jsx("img", { src: imageSrc, alt: alt, loading: getImageLoading(priority), fetchPriority: getFetchPriority(priority), onError: () => setHasError(true), className: cn('h-full w-full', objectFitClasses[objectFit ?? 'cover']), ...props }) }));
}
