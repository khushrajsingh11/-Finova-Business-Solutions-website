// Route metadata shared by the app (runtime head updates) and the build (prerendered HTML, sitemap, robots).
// Keep this file free of browser and Vite-only APIs so Node can import it from vite.config.js.
import { services, serviceBySlug } from './services.js'

export const siteName = 'Finova Business Solutions'
export const contactEmail = 'contact@finovabusiness.com'
export const socialImage = { path: '/og-image.jpg', width: 1200, height: 630, alt: 'Finova Business Solutions logo' }
export const logoPath = '/finova-logo.png'

const pages = {
  '/': {
    title: 'Finova Business Solutions | Your Business. Our Expertise. Your Growth.',
    description: 'Personalized support for entrepreneurs and growing businesses: formation and registration, bookkeeping and payroll, administration, HR, marketing, and operations.',
  },
  '/about': {
    title: 'About Us | Finova Business Solutions',
    description: 'Learn how Finova Business Solutions helps entrepreneurs, startups, and established businesses simplify operations with dependable, personalized support.',
  },
  '/services': {
    title: 'Business Services | Finova Business Solutions',
    description: 'Explore business formation and registration, bookkeeping and payroll, administration, marketing and collaborations, human resources, and operational support.',
  },
  '/inquiry': {
    title: 'Contact Us | Finova Business Solutions',
    description: 'Contact Finova Business Solutions. Tell us what you are working on and the business support you need, or email contact@finovabusiness.com.',
  },
}

export const indexableRoutes = [...Object.keys(pages), ...services.map((service) => `/services/${service.slug}`)]

export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

export function routeMeta(rawPathname) {
  const pathname = normalizePath(rawPathname)
  if (pages[pathname]) return { kind: pathname === '/' ? 'home' : 'page', path: pathname, ...pages[pathname] }

  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/)
  const service = serviceMatch && serviceBySlug(serviceMatch[1])
  if (service) {
    return {
      kind: 'service',
      path: `/services/${service.slug}`,
      service,
      title: `${service.name} | ${siteName}`,
      description: service.description,
    }
  }

  return { kind: 'notFound', path: pathname, title: `Page Not Found | ${siteName}`, description: 'This page could not be found.', noindex: true }
}

const absolute = (siteUrl, path) => `${siteUrl.replace(/\/+$/, '')}${path}`

export function structuredData(meta, siteUrl) {
  const businessId = absolute(siteUrl, '/#business')
  const business = {
    '@type': 'ProfessionalService',
    '@id': businessId,
    name: siteName,
    url: absolute(siteUrl, '/'),
    logo: absolute(siteUrl, logoPath),
    image: absolute(siteUrl, socialImage.path),
    email: contactEmail,
    description: pages['/'].description,
    address: { '@type': 'PostalAddress', addressRegion: 'NJ', addressCountry: 'US' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, url: absolute(siteUrl, `/services/${service.slug}`) },
      })),
    },
  }

  if (meta.kind === 'home') {
    return [{ '@context': 'https://schema.org', '@graph': [business, { '@type': 'WebSite', name: siteName, url: absolute(siteUrl, '/'), publisher: { '@id': businessId } }] }]
  }
  if (meta.kind === 'service') {
    return [{
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Service', name: meta.service.name, serviceType: meta.service.name, description: meta.service.description, url: absolute(siteUrl, meta.path), provider: { '@type': 'ProfessionalService', '@id': businessId, name: siteName, url: absolute(siteUrl, '/') } },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absolute(siteUrl, '/') },
            { '@type': 'ListItem', position: 2, name: 'Services', item: absolute(siteUrl, '/services') },
            { '@type': 'ListItem', position: 3, name: meta.service.name, item: absolute(siteUrl, meta.path) },
          ],
        },
      ],
    }]
  }
  return []
}

const escapeAttr = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Everything that differs per route, rendered between the <!-- seo:start --> and <!-- seo:end --> markers in index.html.
export function headTags(meta, siteUrl) {
  const url = absolute(siteUrl, meta.path === '/' ? '/' : meta.path)
  const image = absolute(siteUrl, socialImage.path)
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
  ]
  if (meta.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
  } else {
    tags.push(
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeAttr(siteName)}" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:image" content="${escapeAttr(image)}" />`,
      `<meta property="og:image:width" content="${socialImage.width}" />`,
      `<meta property="og:image:height" content="${socialImage.height}" />`,
      `<meta property="og:image:alt" content="${escapeAttr(socialImage.alt)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
      `<meta name="twitter:image:alt" content="${escapeAttr(socialImage.alt)}" />`,
    )
  }
  structuredData(meta, siteUrl).forEach((data) => {
    tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  })
  return tags.join('\n    ')
}
