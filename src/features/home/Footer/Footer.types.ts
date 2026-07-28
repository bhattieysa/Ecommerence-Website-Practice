import type { HTMLAttributes, ReactNode } from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnData {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface FooterDownloadApp {
  label: string;
  href: string;
  type: 'apple' | 'google';
  icon?: ReactNode;
  button?: ReactNode;
}

export interface FooterSocial {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  description?: ReactNode;
  contacts?: FooterContact[];
  downloadApps?: FooterDownloadApp[];
  columns: FooterColumnData[];
  socials?: FooterSocial[];
  copyright?: ReactNode;
  bottomLinks?: FooterLink[];
  className?: string;
}
