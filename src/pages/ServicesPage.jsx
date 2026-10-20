import React from 'react'
import PageIntro from '../components/PageIntro'
import SectionHeading from '../components/SectionHeading'
import { inquiryPath, services } from '../data/services'

export default function ServicesPage() {
  return (
    <main id="main" className="inner-page">
      <PageIntro number="01" eyebrow="OUR SERVICES" title={<>The support behind a <em>better-run</em> business.</>} lead="From essential administration to operational guidance, Finova helps bring the moving parts of your business together." />
      <section className="services-overview-section section-wrap" aria-label="Business services">
        <div className="services-overview-intro"><SectionHeading number="02" eyebrow="FIND YOUR SUPPORT" title="Support that fits your business, right now." description="Choose the service that matches your next step. Each area can be shaped around your business and its needs." /><a className="button button--ink" href="/inquiry">Not sure where to start? Let’s talk <span aria-hidden="true">↗</span></a></div>
        <div className="service-directory service-directory--page">
          {services.map((service, index) => (
            <article className={`service-row service-overview-row${index === 0 ? ' service-overview-row--featured' : ''}`} key={service.slug}>
              <a className="service-overview-card-link" href={`/services/${service.slug}`} aria-label={`View ${service.name} service`} />
              <span className="service-number">{service.mark}</span>
              <div className="service-overview-title"><h2>{service.name}</h2><span className="service-overview-tag">{service.tag}</span></div>
              <p>{service.description}</p>
              <div className="service-overview-actions"><a href={inquiryPath(service)}>Enquire <span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </section>
      <section className="services-bottom-cta">
        <div className="section-wrap services-bottom-inner"><SectionHeading eyebrow="A GOOD PLACE TO BEGIN" title={<>Let’s find the right support for <em>you.</em></>} description="Tell us what you need help with, and we’ll start with the priorities that matter to your business." /><a className="button button--ink" href="/inquiry">Make an enquiry <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  )
}
