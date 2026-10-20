import React from 'react'
import { services } from '../data/services'
import finovaLogo from '../assets/finova-logo.webp'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-wrap">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a className="brand brand--light" href="/" aria-label="Finova Business Solutions, home">
              <img src={finovaLogo} alt="" width="480" height="320" />
            </a>
            <p>Practical business support for the people building what’s next.</p>
          </div>
          <div className="footer-col">
            <p className="footer-label">Explore</p>
            <a href="/">Home</a><a href="/about">About us</a><a href="/services">Services</a><a href="/inquiry">Contact</a>
          </div>
          <div className="footer-col footer-service-col">
            <p className="footer-label">Our services</p>
            {services.map((service) => <a key={service.slug} href={`/services/${service.slug}`}>{service.name}</a>)}
          </div>
          <div className="footer-col footer-contact-col">
            <p className="footer-label">Get in touch</p>
            <a href="mailto:contact@finovabusiness.com">contact@finovabusiness.com</a>
            <span>New Jersey, USA</span>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Finova Business Solutions</span><a href="/">Back to home ↑</a><span>Made for the work behind your work.</span></div>
      </div>
    </footer>
  )
}
