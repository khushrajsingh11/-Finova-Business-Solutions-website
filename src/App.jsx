import React, { useEffect } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServicePage from './pages/ServicePage'
import InquiryPage from './pages/InquiryPage'
import NotFoundPage from './pages/NotFoundPage'
import SiteLayout from './components/SiteLayout'
import { normalizePath, routeMeta } from './data/siteMeta'

const pages = { '/': HomePage, '/about': AboutPage, '/services': ServicesPage, '/inquiry': InquiryPage }

function resolvePage(meta) {
  if (meta.kind === 'service') return <ServicePage service={meta.service} />
  const Page = pages[meta.path] || NotFoundPage
  return <Page />
}

// Static HTML already carries these tags for every route (see vite.config.js); this keeps them in sync
// if a host ever serves index.html for a route instead of its prerendered file.
function syncHead(meta) {
  document.title = meta.title
  const url = `${window.location.origin}${meta.path}`
  const set = (selector, value) => document.querySelector(selector)?.setAttribute(selector.startsWith('link') ? 'href' : 'content', value)
  set('meta[name="description"]', meta.description)
  set('meta[property="og:title"]', meta.title)
  set('meta[name="twitter:title"]', meta.title)
  set('meta[property="og:description"]', meta.description)
  set('meta[name="twitter:description"]', meta.description)
  if (document.querySelector('link[rel="canonical"]')?.href.startsWith(window.location.origin)) {
    set('link[rel="canonical"]', url)
    set('meta[property="og:url"]', url)
  }
}

export default function App() {
  const pathname = normalizePath(window.location.pathname)
  const meta = routeMeta(pathname)

  useEffect(() => {
    syncHead(meta)
  }, [meta.title, meta.description, meta.path])

  return <SiteLayout pathname={pathname}>{resolvePage(meta)}</SiteLayout>
}
