import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function SiteLayout({ pathname, children }) {
  return <><SiteHeader pathname={pathname} />{children}<SiteFooter /></>
}
