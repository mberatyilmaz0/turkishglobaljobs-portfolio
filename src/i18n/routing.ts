import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'de'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/opportunity-card': {
      tr: '/firsat-karti',
      de: '/chancenkarte',
    },
    '/jobs': {
      tr: '/almanya-is',
      de: '/arbeit-in-deutschland',
    },
    '/education': {
      tr: '/almanya-egitim',
      de: '/bildung-in-deutschland',
    },
    '/pre-application': {
      tr: '/on-basvuru',
      de: '/vorab-bewerbung',
    },
    '/jobs/[id]': {
      tr: '/almanya-is/[id]',
      de: '/arbeit-in-deutschland/[id]',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing as any);
