import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProductSectionHeader } from '@/features/home/ProductSection/ProductSectionHeader';
import { cn } from '@/lib/utils/cn';
import { FeatureCard } from './FeatureCard';
import { featureGridVariants, featureSectionContentVariants, featureSectionVariants, } from './FeatureSectionVariants';
export function FeatureSection({ title, subtitle, features, action, columns, cardProps, className, ...props }) {
    return (_jsx("section", { className: cn(featureSectionVariants(), className), ...props, children: _jsxs("div", { className: featureSectionContentVariants(), children: [(title || subtitle || action) && (_jsx(ProductSectionHeader, { title: title ?? '', subtitle: subtitle, action: action })), _jsx("div", { className: featureGridVariants({
                        columns,
                    }), children: features.map((feature) => (_jsx(FeatureCard, { feature: feature, ...cardProps }, feature.id))) })] }) }));
}
