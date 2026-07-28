import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';
import { cn } from '@/lib/utils/cn';
import { BrandCard } from './BrandCard';
import { brandGridVariants, brandSectionContentVariants, brandSectionVariants, } from './BrandSectionVariants';
export function BrandSection({ title, subtitle, brands, action, limit, columns, cardProps, className, ...props }) {
    const displayedBrands = brands.slice(0, limit ?? brands.length);
    return (_jsx("section", { className: cn(brandSectionVariants(), className), ...props, children: _jsxs("div", { className: brandSectionContentVariants(), children: [(title || subtitle || action) && (_jsx(ProductSectionHeader, { title: title ?? '', subtitle: subtitle, action: action })), _jsx("div", { className: brandGridVariants({
                        columns,
                    }), children: displayedBrands.map((brand) => (_jsx(BrandCard, { brand: brand, ...cardProps }, brand.id))) })] }) }));
}
