import { cva } from 'class-variance-authority';

export const HeroVariants = cva(
  ['relative', 'overflow-hidden', 'rounded-[28px]', 'bg-gradient-to-br'],
  {
    variants: {
      size: {
        sm: [
          'px-4 py-4',
          'sm:px-6',
          'lg:px-10 lg:py-7',

          'min-h-[220px]',
          'sm:min-h-[260px]',
          'lg:min-h-[340px]',
        ],

        md: [
          'px-4 py-5',
          'sm:px-6',
          'md:px-8',
          'lg:px-14 lg:py-9',

          'min-h-[260px]',
          'sm:min-h-[300px]',
          'lg:min-h-[380px]',
        ],

        lg: [
          'px-4 py-6',
          'sm:px-6',
          'md:px-10',
          'lg:px-16 lg:py-12',
          'xl:px-20',

          'min-h-[340px]',
          'sm:min-h-[380px]',
          'lg:min-h-[460px]',
        ],
      },

      alignment: {
        left: '',
        center: '',
      },

      imagePosition: {
        left: '',
        right: '',
      },

      category: {
        electronics: ['from-[#1a365d]', 'via-[#2c5282]', 'to-[#2b6cb0]'],
        fashion: ['from-[#742a2a]', 'via-[#9b2c2c]', 'to-[#c53030]'],
        grocery: ['from-[#276749]', 'via-[#2f855a]', 'to-[#38a169]'],
        beauty: ['from-[#702459]', 'via-[#97266d]', 'to-[#b83280]'],
        home: ['from-[#44337a]', 'via-[#5b4b8a]', 'to-[#7c6db9]'],
        kitchen: ['from-[#9c4221]', 'via-[#c05621]', 'to-[#dd6b20]'],
        sports: ['from-[#1a365d]', 'via-[#2a4365]', 'to-[#3182ce]'],
        gaming: ['from-[#1a202c]', 'via-[#2d3748]', 'to-[#4a5568]'],
      },
    },

    defaultVariants: {
      size: 'lg',
      alignment: 'left',
      imagePosition: 'right',
    },
  },
);

export const heroGridVariants = cva([
  'grid',
  'grid-cols-1',
  'items-center',
  'w-full',

  'gap-8',

  'lg:grid-cols-[1.1fr_0.9fr]',
  'lg:gap-16',
]);

export const heroContentVariants = cva(
  [
    'flex',
    'flex-col',

    'justify-center',

    'gap-3',
    'sm:gap-4',
    'lg:gap-5',

    'text-center',
    'items-center',
    'min-w-0',

    'lg:text-left',
    'lg:items-start',
  ],
  {
    variants: {
      alignment: {
        left: 'lg:text-left lg:items-start',
        center: 'text-center items-center',
      },
    },

    defaultVariants: {
      alignment: 'left',
    },
  },
);

export const heroBadgeVariants = cva([
  'uppercase',
  'tracking-[0.28em]',
  'font-semibold',

  'text-[10px]',
  'sm:text-xs',

  'text-white/60',
]);

export const heroTitleVariants = cva([
  'max-w-full',
  'sm:max-w-[18ch]',
  'md:max-w-[22ch]',

  'text-[clamp(0.95rem,5vw,1.6rem)]',
  'sm:text-[clamp(1.05rem,4vw,1.9rem)]',
  'md:text-[clamp(1.4rem,3.5vw,2.4rem)]',
  'lg:text-[clamp(2rem,3vw,3.5rem)]',
  'xl:text-[clamp(2.5rem,2.5vw,4.5rem)]',

  'font-extrabold',
  'leading-tight',
  'tracking-tight',

  'break-words',
  'text-white',
]);

export const heroSubtitleVariants = cva([
  'max-w-full',
  'sm:max-w-[24ch]',

  'text-[clamp(0.8rem,3.5vw,0.95rem)]',
  'sm:text-[clamp(0.9rem,3vw,1rem)]',
  'lg:text-[clamp(1.1rem,2.2vw,1.5rem)]',

  'font-semibold',

  'tracking-tight',

  'break-words',
  'text-white',
]);

export const heroDescriptionVariants = cva([
  'max-w-full',
  'sm:max-w-[24ch]',

  'text-[clamp(0.75rem,2.5vw,0.9rem)]',
  'sm:text-[clamp(0.8rem,2.2vw,0.95rem)]',

  'leading-6',

  'break-words',
  'text-white/75',
]);

export const heroImageVariants = cva([
  'flex',

  'justify-center',
  'items-center',

  'mt-6',
  'lg:mt-0',

  'overflow-hidden',
  'rounded-xl',
]);

export const heroImageElementVariants = cva([
  'mx-auto',

  'w-full',

  'max-w-[280px]',
  'sm:max-w-[350px]',
  'md:max-w-[400px]',
  'lg:max-w-[446px]',
  'xl:max-w-[446px]',

  'h-[188px]',
  'sm:h-[235px]',
  'md:h-[269px]',
  'lg:h-[300px]',
  'xl:h-[300px]',

  'object-contain',

  'drop-shadow-2xl',

  'transition-transform',
  'duration-500',

  'hover:scale-[1.03]',
]);

export const heroBackgroundVariants = cva([
  'absolute',
  'inset-0',

  'pointer-events-none',

  'overflow-hidden',

  'hidden',
  'lg:block',
]);

export const heroCircleVariants = cva(
  ['absolute', 'rounded-full', 'border', 'border-white/5'],
  {
    variants: {
      position: {
        topLarge: 'right-24 top-8 h-72 w-72',
        topSmall: 'right-0 top-24 h-52 w-52',
        bottomLarge: 'right-32 bottom-0 h-64 w-64',
      },
    },
  },
);

export const heroCarouselVariants = cva(['relative', 'w-full']);

export const heroViewportVariants = cva(['overflow-hidden', 'rounded-[28px]']);

export const heroTrackVariants = cva(['flex']);

export const heroSlideVariants = cva(['min-w-0', 'flex-[0_0_100%]']);

export const heroArrowContainerVariants = cva(
  ['absolute', 'top-1/2', '-translate-y-1/2', 'z-30'],
  {
    variants: {
      side: {
        left: ['-left-10', 'sm:left-4', 'lg:-left-10'],

        right: ['-right-10', 'sm:right-4', 'lg:-right-10'],
      },

      visibility: {
        always: '',
        desktop: 'hidden lg:flex',
      },
    },

    defaultVariants: {
      visibility: 'always',
    },
  },
);

export const heroArrowButtonVariants = cva(
  [
    'rounded-full',

    'bg-white',

    'text-primary',

    'border',
    'border-slate-100',

    'shadow-xl',

    'transition-all',
    'duration-300',

    'hover:scale-110',
    'hover:shadow-2xl',

    'active:scale-95',

    'disabled:opacity-50',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-9 w-9',
        md: 'h-11 w-11',
        lg: 'h-20 w-20',
      },
    },

    defaultVariants: {
      size: 'lg',
    },
  },
);

export const heroPaginationVariants = cva([
  'mt-4',
  'lg:mt-5',

  'flex',

  'items-center',
  'justify-center',

  'gap-2',
]);

export const heroPaginationDotVariants = cva(
  ['rounded-full', 'transition-all', 'duration-300', 'ease-in-out'],
  {
    variants: {
      active: {
        true: ['w-8', 'h-2', 'bg-primary'],

        false: ['w-2', 'h-2', 'bg-primary/20', 'hover:bg-primary/40'],
      },

      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },

    compoundVariants: [
      {
        active: true,
        size: 'sm',
        className: 'w-6',
      },
      {
        active: true,
        size: 'md',
        className: 'w-8',
      },
      {
        active: true,
        size: 'lg',
        className: 'w-10',
      },
    ],

    defaultVariants: {
      active: false,
      size: 'md',
    },
  },
);
