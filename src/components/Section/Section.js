import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container } from '@/components/Container/Container';
import { SectionHeader } from '@/components/Section/SectionHeader';
import { sectionVariants } from '@/components/Section/SectionVariants';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
export const Section = forwardRef(({ title, subtitle, action, spacing, className, children, ...props }, ref) => {
    return (_jsxs("section", { ref: ref, className: cn(sectionVariants({ spacing }), className), ...props, children: [_jsx(SectionHeader, { title: title, subtitle: subtitle, action: action }), children] }));
});
Section.displayName = 'Section';
