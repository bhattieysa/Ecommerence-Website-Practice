import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';
import { cn } from '@/lib/utils/cn';
import { CategoryCard } from './CategoryCard';
import { categoryGridVariants, categorySectionContentVariants, categorySectionVariants, } from './CategorySectionVariants';
export function CategorySection({ title, subtitle, categories, action, limit, columns, categoryCardSize, categoryCardVariant, className, }) {
    const displayedCategories = categories.slice(0, limit ?? categories.length);
    return (_jsx("section", { className: cn(categorySectionVariants(), className), children: _jsxs("div", { className: categorySectionContentVariants(), children: [_jsx(ProductSectionHeader, { title: title, subtitle: subtitle, action: action }), _jsx("div", { className: categoryGridVariants({
                        columns,
                    }), children: displayedCategories.map((category) => (_jsx(CategoryCard, { category: category, size: categoryCardSize, variant: categoryCardVariant }, category.id))) })] }) }));
}
