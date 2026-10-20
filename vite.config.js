import { defineConfig, loadEnv } from 'vite'
import { headTags, indexableRoutes, routeMeta } from './src/data/siteMeta.js'

const seoBlock = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/

const withSeo = (html, meta, siteUrl) => {
  if (!seoBlock.test(html)) throw new Error('index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers.')
  return html.replace(seoBlock, `<!-- seo:start -->\n    ${headTags(meta, siteUrl)}\n    <!-- seo:end -->`)
}

// Writes route-specific titles, descriptions, canonical URLs, social tags and JSON-LD into static HTML
// so crawlers and link previews see them without running JavaScript. No framework migration needed.
function finovaSeo(siteUrl) {
  let isBuild = false
  return {
    name: 'finova-seo',
    enforce: 'post',
    configResolved(config) {
      isBuild = config.command === 'build'
      if (isBuild && !/^https:\/\/[^/]+$/.test(siteUrl || '')) {
        throw new Error('Set VITE_SITE_URL to the production origin, e.g. https://finovabusiness.com (no trailing slash).')
      }
    },
    transformIndexHtml(html, ctx) {
      const path = isBuild ? '/' : (ctx.originalUrl || '/').split('?')[0]
      return withSeo(html, routeMeta(path), siteUrl || 'http://localhost:5173')
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index) return
      const html = String(index.source)
      indexableRoutes.filter((route) => route !== '/').forEach((route) => {
        this.emitFile({ type: 'asset', fileName: `${route.slice(1)}.html`, source: withSeo(html, routeMeta(route), siteUrl) })
      })
      this.emitFile({ type: 'asset', fileName: '404.html', source: withSeo(html, routeMeta('/404'), siteUrl) })
      const urls = indexableRoutes.map((route) => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`).join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return { plugins: [finovaSeo(env.VITE_SITE_URL)] }
})
