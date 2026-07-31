// Color theme variants
export const colorThemes = {
  emerald: {
    from: 'from-emerald-500',
    to: 'to-green-600',
    fromHover: 'hover:from-emerald-600',
    toHover: 'hover:to-green-700',
    focus: 'focus:border-emerald-500 focus:ring-emerald-500/20',
    hover: 'hover:text-emerald-600',
    panelSubtitle: 'text-emerald-100',
  },
  blue: {
    from: 'from-blue-500',
    to: 'to-indigo-600',
    fromHover: 'hover:from-blue-600',
    toHover: 'hover:to-indigo-700',
    focus: 'focus:border-blue-500 focus:ring-blue-500/20',
    hover: 'hover:text-blue-600',
    panelSubtitle: 'text-blue-100',
  },
  purple: {
    from: 'from-purple-500',
    to: 'to-pink-600',
    fromHover: 'hover:from-purple-600',
    toHover: 'hover:to-pink-700',
    focus: 'focus:border-purple-500 focus:ring-purple-500/20',
    hover: 'hover:text-purple-600',
    panelSubtitle: 'text-purple-100',
  },
} as const;

// Size variants
export const sizes = {
  sm: {
    container: 'h-[500px] md:h-[600px]',
    input: 'px-3 py-2 text-sm md:px-4 md:py-2',
    button: 'px-4 py-2 text-sm md:px-6 md:py-2',
    heading: 'text-xl md:text-2xl',
    subtitle: 'text-sm md:text-base',
  },
  md: {
    container: 'h-[600px] md:h-[700px]',
    input: 'px-4 py-3 text-sm md:px-6 md:py-4 md:text-base',
    button: 'px-6 py-3 text-sm md:px-8 md:py-4 md:text-lg',
    heading: 'text-2xl md:text-4xl',
    subtitle: 'text-sm md:text-lg',
  },
  lg: {
    container: 'h-[700px] md:h-[800px]',
    input: 'px-6 py-4 text-base md:px-8 md:py-5 md:text-lg',
    button: 'px-8 py-4 text-base md:px-10 md:py-5 md:text-xl',
    heading: 'text-3xl md:text-5xl',
    subtitle: 'text-base md:text-xl',
  },
} as const;

// Animation variants
export const animations = {
  fast: 'duration-300',
  normal: 'duration-700',
  slow: 'duration-1000',
} as const;

// Base styles
export const baseStyles = {
  container:
    'relative w-full max-w-4xl md:max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl',
  formPanel:
    'relative md:absolute top-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-12',
  transition: 'transition-opacity ease-in-out',
  greenPanel:
    'hidden md:flex absolute top-0 h-full w-full md:w-1/2 bg-gradient-to-br flex-col items-center justify-center text-white p-4 md:p-12 z-10',
  panelTransition: 'transition-all ease-in-out',
  heading: 'mb-2 font-bold text-gray-800',
  subtitle: 'mb-6 md:mb-8 text-gray-600',
  socialButton:
    'rounded-full border border-gray-300 p-2 md:p-4 text-gray-600 transition-all hover:bg-gray-100',
  input:
    'w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2',
  primaryButton:
    'w-full max-w-xs md:max-w-sm rounded-lg bg-gradient-to-r font-semibold text-white transition-all hover:shadow-lg',
  panelHeading: 'mb-2 md:mb-4 font-bold',
  panelSubtitle: 'mb-6 md:mb-8 text-center',
  panelButton:
    'rounded-full border-2 border-white font-semibold text-white transition-all hover:bg-white hover:shadow-lg',
  divider: 'mb-3 md:mb-4 text-xs md:text-sm text-gray-500',
  active: 'z-20 opacity-100',
  inactive: 'z-0 opacity-0 pointer-events-none',
  leftPanel: 'left-0',
  rightPanel: 'right-0',
  panelLeft: 'left-0',
  panelRight: 'left-1/2',
} as const;

export type ColorTheme = keyof typeof colorThemes;
export type Size = keyof typeof sizes;
export type Animation = keyof typeof animations;
