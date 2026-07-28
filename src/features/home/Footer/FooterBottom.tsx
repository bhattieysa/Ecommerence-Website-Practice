import { Typography } from '@/components/Typography';

import { footerBottomVariants } from './FooterVariants';

import type { FooterProps } from './Footer.types';

export function FooterBottom({ copyright }: Pick<FooterProps, 'copyright'>) {
  return (
    <div className={footerBottomVariants()}>
      <Typography
        variant="caption"
        className="text-blue-100 text-center w-full"
      >
        {copyright}
      </Typography>
    </div>
  );
}
