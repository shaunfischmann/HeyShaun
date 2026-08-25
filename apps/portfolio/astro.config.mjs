import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://heyshaun.fr',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-heading',
      weights: ['600 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Notable',
      cssVariable: '--font-hero',
      styles: ['normal'],
      fallbacks: ['sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Oleo Script',
      cssVariable: '--font-script',
      styles: ['normal'],
      fallbacks: ['cursive', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Press Start 2P',
      cssVariable: '--font-code',
      weights: ['400'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'monospace']
    }
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          fr: 'fr',
        },
      },
      filter: (page) => 
        page !== 'https://heyshaun.fr/' &&
        !page.endsWith('https://heyshaun.fr/credits/') &&
        !page.endsWith('https://heyshaun.fr/legal-notice/') &&
        !page.endsWith('https://heyshaun.fr/shaun-ai-gallery/'),
    }),
  ],
});
