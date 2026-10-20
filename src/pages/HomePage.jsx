import React from 'react'
import { services } from '../data/services'
import SectionHeading from '../components/SectionHeading'
import WhyFinova from '../components/WhyFinova'

function HomePage() {
  return (
      <main id="main" className="home-page">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" />Business support, made personal</p>
            <h1 id="hero-title">Your business.<br /><em>Our expertise.</em><br />Your growth.</h1>
            <p className="hero-lede">Running a business should be about pursuing opportunities—not getting overwhelmed by everyday operations.</p>
            <p className="hero-detail">Finova brings practical, personalized support to the work behind your business, so you can focus on what comes next.</p>
            <div className="hero-actions">
              <a className="button button--ink" href="/services">Explore our services <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="/inquiry">Let’s talk <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-note"><span className="note-star" aria-hidden="true">✳</span><span>For entrepreneurs, startups<br />and growing businesses</span></div>
          </div>
          <div className="hero-visual" aria-label="A calm, light-filled workspace">
            <div className="hero-photo" role="img" aria-label="Sunlight across a shared workspace table" />
            <div className="photo-caption"><span>SPACE TO THINK</span><span>AND ROOM TO GROW</span></div>
            <div className="hero-stamp" aria-hidden="true"><span>F</span><small>YOUR BUSINESS<br />PARTNER</small></div>
            <div className="visual-index" aria-hidden="true">01 <span /> 04</div>
          </div>
        </section>

        <div className="service-ticker" aria-label="Finova business support services">
          <span className="ticker-label" aria-hidden="true">OUR SERVICES <span>↗</span></span>
          <div className="ticker-window">
            <div className="ticker-track" aria-hidden="true">
              {[0, 1].map((copy) => (
                <div className="ticker-group" key={copy}>
                  {services.map((service) => <span className="ticker-item" key={`${copy}-${service.slug}`}>{service.name}<span className="ticker-star">✳</span></span>)}
                </div>
              ))}
            </div>
          </div>
          <ul className="ticker-sr-only">
            {services.map((service) => <li key={service.slug}>{service.name}</li>)}
          </ul>
        </div>

        <section className="intro section-wrap" id="about" aria-labelledby="intro-title">
          <div className="intro-content">
            <SectionHeading number="01" eyebrow="THE FINOVA APPROACH" title={<>More time for what moves your business <em>forward.</em></>} description="Running a business brings a lot of moving parts. We help entrepreneurs, startups, and established businesses simplify operations, stay organized, and keep their attention on what matters most." id="intro-title" />
            <div className="intro-text">
              <p>Think of us as a reliable partner for the essential work happening behind the scenes—working alongside you with practical support and clear communication.</p>
              <a className="button button--ink" href="/about">A little about how we work <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="intro-aside"><span className="aside-mark" aria-hidden="true">F.</span><span>Clarity for today.<br />Confidence for what’s next.</span></div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="section-wrap services-showcase">
            <div className="services-heading">
              <SectionHeading number="02" eyebrow="FINOVA SERVICES" title={<>Everything your business needs to <em>move forward.</em></>} id="services-title" action={<a className="button button--ink services-all-link" href="/services">Explore all services <span aria-hidden="true">↗</span></a>} />
              <div className="services-heading-footer">
                <p className="services-heading-detail">Choose a single area or bring several moving parts together with support shaped around your current priorities.</p>
              </div>
            </div>
            <div className="service-directory" aria-label="Finova services">
              {services.map((service) => (
                <article className="service-row" key={service.name}>
                  <span className="service-number">{service.mark}</span>
                  <h3><a href={`/services/${service.slug}`}>{service.name}</a></h3>
                  <p>{service.description}</p>
                  <a className="service-link" href={`/services/${service.slug}`} aria-label={`Explore ${service.name}`}><span>Explore</span><span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WhyFinova number="03" />

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-wrap contact-wrap home-contact-wrap">
            <div className="contact-copy">
              <SectionHeading number="04" eyebrow="LET’S GET STARTED" title={<>Let’s build your business <em>together.</em></>} description="Whether you’re just getting started or looking to streamline an established business, we’re ready to help you move forward with confidence." id="contact-title" light />
              <a className="contact-email" href="mailto:contact@finovabusiness.com">contact@finovabusiness.com <span aria-hidden="true">↗</span></a>
            </div>
            <div className="home-contact-action">
              <p>Tell us what you’re working on. We’ll make it easy to start the conversation.</p>
              <a className="button button--sage" href="/inquiry">Send an inquiry <span aria-hidden="true">↗</span></a>
              <span className="contact-spark" aria-hidden="true">✳</span>
            </div>
          </div>
        </section>
      </main>

  )
}

export default HomePage
