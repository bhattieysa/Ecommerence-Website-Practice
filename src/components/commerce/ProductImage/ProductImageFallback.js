import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageOff } from 'lucide-react';
import { Typography } from '@/components/Typography/Typography';
import { PRODUCT_IMAGE_FALLBACK_ALT } from '@/components/commerce/ProductImage/ProductImage.constants';
export function ProductImageFallback({ alt = PRODUCT_IMAGE_FALLBACK_ALT, }) {
    return (_jsxs("div", { className: "\n        flex\n        h-full\n        w-full\n        flex-col\n        items-center\n        justify-center\n        gap-2\n        bg-muted\n        text-muted-foreground\n      ", role: "img", "aria-label": alt, children: [_jsx(ImageOff, { className: "h-8 w-8 opacity-70" }), _jsx(Typography, { variant: "bodySm", className: "text-center", children: alt })] }));
}
