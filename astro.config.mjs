import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://filmsforemptyrooms.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'monthly',
      priority: 0.7,
    })
  ],
});
