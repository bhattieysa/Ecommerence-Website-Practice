import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';

import { cn } from '@/lib/utils/cn';

import { FooterBottom } from './FooterBottom';
import { FooterColumn } from './FooterColumn';

import type { FooterProps } from './Footer.types';

import {
  footerBrandVariants,
  footerColumnsVariants,
  footerContactItemVariants,
  footerContactVariants,
  footerContentVariants,
  footerDownloadVariants,
  footerVariants,
} from './FooterVariants';

export function Footer({
  logo,
  contacts,
  downloadApps,
  columns,
  copyright,
  className,
  ...props
}: FooterProps) {
  return (
    <footer className={cn(footerVariants(), className)} {...props}>
      <Container size="hero">
        <div className={footerContentVariants()}>
          <div className={footerBrandVariants()}>
            {logo}

            {contacts && contacts.length > 0 && (
              <div className={footerContactVariants()}>
                {contacts.map((contact) => (
                  <div
                    key={contact.label}
                    className={footerContactItemVariants()}
                  >
                    <span className="p-2 bg-white/10 rounded-lg">
                      {contact.icon}
                    </span>
                    <div className="flex flex-col">
                      <Typography variant="caption" className="text-blue-100">
                        {contact.label}
                      </Typography>
                      <Typography variant="body" className="text-white">
                        {contact.value}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {downloadApps && downloadApps.length > 0 && (
              <div className={cn(footerDownloadVariants())}>
                {downloadApps.map((app) => (
                  <div key={app.label}>{app.button}</div>
                ))}
              </div>
            )}
          </div>

          <div className={footerColumnsVariants()}>
            {columns.map((column) => (
              <FooterColumn key={column.id} {...column} />
            ))}
          </div>
        </div>

        <FooterBottom copyright={copyright} />
      </Container>
    </footer>
  );
}
