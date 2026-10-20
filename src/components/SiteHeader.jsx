import React, { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import finovaLogo from '../assets/finova-logo.webp'

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Finova Business Solutions, home">
      <img src={finovaLogo} alt="" width="480" height="320" />
    </a>
  )
}

export default function SiteHeader({ pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const headerRef = useRef(null)
  const servicesRef = useRef(null)
  const menuButtonRef = useRef(null)
  // A mouse that opened the submenu by hovering should not close it again by clicking the chevron.
  const openedByHoverRef = useRef(false)
  const closeMenu = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }
  const active = (path) => pathname === path || (path === '/services' && pathname.startsWith('/services/'))

  useEffect(() => {
    const header = headerRef.current
    if (!header) return undefined
    let frame = 0
    const updateCompactState = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.scrollY > 56) header.classList.add('is-compact')
        else if (window.scrollY < 16) header.classList.remove('is-compact')
      })
    }
    updateCompactState()
    window.addEventListener('scroll', updateCompactState, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateCompactState)
    }
  }, [])

  useEffect(() => {
    const handlePointer = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false)
        setServicesOpen(false)
      } else if (!servicesRef.current?.contains(event.target)) {
        setServicesOpen(false)
      }
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
        setMenuOpen(false)
        if (servicesOpen) servicesRef.current?.querySelector('button')?.focus()
        else if (menuOpen) menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen, servicesOpen])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <Brand />
          <button className="menu-toggle" ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false) }}>
            <span className="menu-toggle-label">{menuOpen ? 'Close' : 'Menu'}</span>
            <span className={`menu-icon${menuOpen ? ' is-open' : ''}`} aria-hidden="true"><i /><i /></span>
          </button>
          <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
            <a href="/" aria-current={active('/') ? 'page' : undefined} onClick={closeMenu}>Home</a>
            <a href="/about" aria-current={active('/about') ? 'page' : undefined} onClick={closeMenu}>About Us</a>
            <div
              className={`nav-services${servicesOpen ? ' is-open' : ''}`}
              ref={servicesRef}
              onPointerEnter={(event) => { if (event.pointerType === 'mouse' && !servicesOpen) { openedByHoverRef.current = true; setServicesOpen(true) } }}
              onPointerLeave={(event) => { if (event.pointerType === 'mouse') { openedByHoverRef.current = false; setServicesOpen(false) } }}
            >
              <div className="nav-services-head">
                <a href="/services" aria-current={active('/services') ? 'page' : undefined} onClick={closeMenu}>Services</a>
                <button type="button" aria-label={servicesOpen ? 'Close services menu' : 'Open services menu'} aria-expanded={servicesOpen} aria-controls="services-submenu" onClick={() => { if (openedByHoverRef.current) openedByHoverRef.current = false; else setServicesOpen(!servicesOpen) }}><span className="nav-chevron" aria-hidden="true" /></button>
              </div>
              <div className="services-submenu" id="services-submenu" role="group" aria-label="Individual services" aria-hidden={!servicesOpen}>
                {services.map((service) => <a href={`/services/${service.slug}`} key={service.slug} onClick={closeMenu}><span>{service.mark}</span>{service.name}<b aria-hidden="true">↗</b></a>)}
              </div>
            </div>
            <a href="/inquiry" aria-current={active('/inquiry') ? 'page' : undefined} onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="/inquiry" onClick={closeMenu}>Let’s talk <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
    </>
  )
}
