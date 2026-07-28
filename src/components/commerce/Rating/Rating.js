import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { DEFAULT_MAX_RATING, DEFAULT_PRECISION, DEFAULT_SIZE, DEFAULT_VARIANT, RATING_KEYS, } from './rating.constants';
import { generateStars, generateAriaLabel, calculateKeyboardNavigation, normalizePrecision, } from './rating.utils';
import { ratingVariants } from './ratingVariants';
import { RatingStar } from './RatingStar';
import { RatingValue } from './RatingValue';
import { RatingCount } from './RatingCount';
export function Rating({ value: controlledValue, defaultValue = 0, max = DEFAULT_MAX_RATING, precision = DEFAULT_PRECISION, size = DEFAULT_SIZE, variant = DEFAULT_VARIANT, interactive = false, readonly = false, disabled = false, onChange, onHover, onHoverEnd, showValue = false, showCount = false, reviewCount = 0, className, ...props }) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState(null);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : currentValue;
    const normalizedRating = normalizePrecision(displayValue, max, precision);
    const stars = generateStars(normalizedRating, max);
    const containerRef = useRef(null);
    const ariaLabel = generateAriaLabel(normalizedRating, max, reviewCount);
    const handleStarClick = useCallback((starIndex) => {
        if (disabled || readonly || !interactive)
            return;
        const newValue = starIndex + 1;
        const roundedValue = normalizePrecision(newValue, max, precision);
        if (!isControlled) {
            setInternalValue(roundedValue);
        }
        onChange?.(roundedValue);
    }, [disabled, readonly, interactive, isControlled, max, precision, onChange]);
    const handleStarHover = useCallback((starIndex) => {
        if (disabled || readonly || !interactive)
            return;
        const newValue = starIndex + 1;
        const roundedValue = normalizePrecision(newValue, max, precision);
        setHoverValue(roundedValue);
        onHover?.(roundedValue);
    }, [disabled, readonly, interactive, max, precision, onHover]);
    const handleHoverEnd = useCallback(() => {
        if (disabled || readonly || !interactive)
            return;
        setHoverValue(null);
        onHoverEnd?.();
    }, [disabled, readonly, interactive, onHoverEnd]);
    const handleKeyDown = useCallback((event) => {
        if (disabled || readonly || !interactive)
            return;
        const key = event.key;
        if (key === RATING_KEYS.ARROW_LEFT ||
            key === RATING_KEYS.ARROW_RIGHT ||
            key === RATING_KEYS.ARROW_UP ||
            key === RATING_KEYS.ARROW_DOWN ||
            key === RATING_KEYS.HOME ||
            key === RATING_KEYS.END ||
            key === RATING_KEYS.ENTER ||
            key === RATING_KEYS.SPACE) {
            event.preventDefault();
            const newValue = calculateKeyboardNavigation(currentValue, key, max, precision);
            if (!isControlled) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        }
    }, [
        disabled,
        readonly,
        interactive,
        currentValue,
        max,
        precision,
        isControlled,
        onChange,
    ]);
    const isInteractive = interactive && !readonly && !disabled;
    return (_jsxs("div", { ref: containerRef, role: "img", "aria-label": ariaLabel, tabIndex: isInteractive ? 0 : undefined, onKeyDown: handleKeyDown, onMouseLeave: handleHoverEnd, className: cn(ratingVariants({
            size,
            variant,
            interactive: isInteractive,
            disabled,
            readonly,
        }), className), ...props, children: [_jsx("div", { className: "flex items-center", children: stars.map((star) => (_jsx("button", { type: "button", disabled: disabled || readonly || !interactive, onClick: () => handleStarClick(star.index), onMouseEnter: () => handleStarHover(star.index), className: cn('relative inline-flex bg-transparent border-0 p-0 cursor-pointer', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', 'focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-500', 'disabled:cursor-not-allowed disabled:opacity-50', !interactive && 'cursor-default pointer-events-none'), "aria-hidden": "true", children: _jsx(RatingStar, { state: star.state, size: size }) }, star.index))) }), showValue && (_jsx(RatingValue, { value: normalizedRating, size: size, variant: variant })), showCount && (_jsx(RatingCount, { count: reviewCount, size: size, variant: variant }))] }));
}
