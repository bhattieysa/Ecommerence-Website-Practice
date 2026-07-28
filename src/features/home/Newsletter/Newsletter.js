import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Typography } from '@/components/Typography';
import { cn } from '@/lib/utils/cn';
import { MarketingLayout, MarketingLayoutContent, MarketingLayoutHeading, MarketingLayoutImage, } from '../MarketingLayout';
import { newsletterFormVariants, newsletterInputWrapperVariants, } from './NewsletterVariants';
export function Newsletter({ title, description, placeholder = 'Enter your email', buttonLabel = 'Subscribe', image, imageAlt = '', imagePosition, layout, alignment, variant, size, rounded, loading = false, error, success, className, onSubmit, ...props }) {
    const [email, setEmail] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        const trimmedEmail = email.trim();
        if (!trimmedEmail || loading) {
            return;
        }
        onSubmit?.(trimmedEmail, event);
    }
    return (_jsxs(MarketingLayout, { variant: variant, size: size, rounded: rounded, imagePosition: imagePosition, alignment: alignment, className: className, ...props, children: [_jsxs(MarketingLayoutContent, { className: cn(alignment === 'center' ? 'items-center text-center' : ''), children: [_jsxs(MarketingLayoutHeading, { children: [_jsx(Typography, { variant: "heading2", className: "max-w-xl", children: title }), description && (_jsx(Typography, { variant: "body", className: "max-w-lg opacity-90", children: description }))] }), _jsxs("form", { onSubmit: handleSubmit, className: cn(newsletterFormVariants({
                            layout,
                        }), 'max-w-xl'), children: [_jsx("div", { className: newsletterInputWrapperVariants(), children: _jsx(Input, { type: "email", value: email, placeholder: placeholder, autoComplete: "email", required: true, disabled: loading, onChange: (event) => setEmail(event.target.value) }) }), _jsx(Button, { type: "submit", size: "lg", disabled: loading, children: loading ? 'Subscribing...' : buttonLabel })] }), error && (_jsx(Typography, { variant: "caption", className: "text-destructive", children: error })), success && (_jsx(Typography, { variant: "caption", className: "text-green-600", children: success }))] }), image && _jsx(MarketingLayoutImage, { src: image, alt: imageAlt })] }));
}
