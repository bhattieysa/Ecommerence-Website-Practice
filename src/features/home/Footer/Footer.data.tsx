import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { Typography } from '@/components/Typography';
import type {
  FooterColumnData,
  FooterContact,
  FooterDownloadApp,
  FooterLink,
  FooterSocial,
} from './Footer.types';
import type { ReactNode } from 'react';
import { GooglePlayButton, AppStoreButton } from 'react-mobile-app-button';

const iosUrl = 'https://apple.com';
const androidUrl = 'https://google.com';

export const footerLogo: ReactNode = (
  <Typography variant="heading2" className="text-white">
    MegaMart
  </Typography>
);

export const footerDescription: ReactNode = (
  <div className="space-y-5">
    <div className="space-y-2">
      <Typography variant="heading5" className="text-white">
        Contact Us
      </Typography>
      <Typography
        variant="body"
        className="text-muted-foreground max-w-[24rem]"
      >
        Reach us on WhatsApp or call our support team for order help, returns,
        or app downloads.
      </Typography>
    </div>
    <Typography
      variant="caption"
      className="text-muted-foreground uppercase tracking-[0.18em]"
    >
      Download App
    </Typography>
  </div>
);

export const footerContacts: FooterContact[] = [
  {
    icon: <FaWhatsapp size={20} className="text-green-500" />,
    label: 'WhatsApp',
    value: '+1 202-918-2132',
  },
  {
    icon: <FiPhoneCall size={20} className="text-blue-500" />,
    label: 'Call us',
    value: '+1 202-918-2132',
  },
];

export const footerDownloadApps: FooterDownloadApp[] = [
  {
    label: 'App Store',
    href: iosUrl,
    type: 'apple',
    button: (
      <div className="h-20 w-52">
        <AppStoreButton url={iosUrl} theme="dark" height={65} width={175} />
      </div>
    ),
  },
  {
    label: 'Play Store',
    href: androidUrl,
    type: 'google',
    button: (
      <div className="h-20 w-52">
        <GooglePlayButton
          url={androidUrl}
          theme="dark"
          height={65}
          width={186}
        />
      </div>
    ),
  },
];

export const footerColumns: FooterColumnData[] = [
  {
    id: 'categories',
    title: 'Most Popular Categories',
    links: [
      { label: 'Staples', href: '#' },
      { label: 'Beverages', href: '#' },
      { label: 'Personal Care', href: '#' },
      { label: 'Home Care', href: '#' },
      { label: 'Baby Care', href: '#' },
      { label: 'Vegetables & Fruits', href: '#' },
      { label: 'Snacks & Foods', href: '#' },
      { label: 'Dairy & Bakery', href: '#' },
    ],
  },
  {
    id: 'services',
    title: 'Customer Services',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'E-waste Policy', href: '#' },
      { label: 'Cancellation & Return Policy', href: '#' },
    ],
  },
];

export const footerCopyright: string =
  '© 2022 All rights reserved. Reliance Retail Ltd.';

export const footerBottomLinks: FooterLink[] = [];

export const footerSocials: FooterSocial[] = [
  {
    icon: <FaFacebookF size={20} />,
    href: '#',
    label: 'Facebook',
  },
  {
    icon: <FaTwitter size={20} />,
    href: '#',
    label: 'Twitter',
  },
  {
    icon: <FaInstagram size={20} />,
    href: '#',
    label: 'Instagram',
  },
  {
    icon: <FaYoutube size={20} />,
    href: '#',
    label: 'YouTube',
  },
];
