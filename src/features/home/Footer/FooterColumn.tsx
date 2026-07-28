import { Link } from 'react-router-dom';

import { Typography } from '@/components/Typography';

import {
  footerColumnVariants,
  footerLinkVariants,
  footerLinksVariants,
} from './FooterVariants';
import type { FooterColumnData } from './Footer.types';

export function FooterColumn({ title, links }: FooterColumnData) {
  return (
    <div className={footerColumnVariants()}>
      <Typography
        variant="heading5"
        className="text-lg font-semibold text-white border-b-2 border-white pb-2 mb-2"
      >
        {title}
      </Typography>

      <nav aria-label={title} className={footerLinksVariants()}>
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className={footerLinkVariants()}
          >
            <span className="mr-2">•</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
