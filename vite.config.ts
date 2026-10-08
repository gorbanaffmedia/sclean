import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Canonical / og:url are injected only when VITE_SITE_URL is set
// (e.g. VITE_SITE_URL=https://example.ru in .env.production). No domain is invented.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '')

  return {
    base: '/new-site/',
    plugins: [
      react(),
      {
        name: 'site-url-tags',
        transformIndexHtml(html) {
          const tags = siteUrl
            ? `<link rel="canonical" href="${siteUrl}/" />\n    <meta property="og:url" content="${siteUrl}/" />`
            : ''
          return html.replace('<!--%SITE_URL_TAGS%-->', tags)
        },
      },
    ],
  }
})