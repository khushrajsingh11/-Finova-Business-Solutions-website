import React from 'react'
import SectionHeading from '../components/SectionHeading'
import { inquiryPath, services } from '../data/services'

export default function ServicePage({ service }) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)
  const headlineWords = service.headline.split(' ')
  const title = <>{headlineWords.slice(0, -2).join(' ')} <em>{headlineWords.slice(-2).join(' ')}</em></>
  // Each overview is a general sentence followed by "Support can include…"; shown as separate paragraphs.
  const overview = service.overview.split(/(?<=\.)\s+(?=[A-Z])/)

  return (
    <main id="main" className="inner-page service-detail-page">
      <section className="service-hero section-wrap" aria-labelledby="page-title">
        <SectionHeading number="01" eyebrow={`FINOVA SERVICES / ${service.name.toUpperCase()}`} title={title} id="page-title" as="h1" className="service-hero-heading" />
        <div className="service-hero-aside">
          <p className="service-hero-lead">{service.description}</p>
          <div className="service-glance">
            <p className="service-glance-label">Key areas</p>
            <ul>{service.support.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="service-glance-links">
              {service.support.length > 4 && <a href="#how-we-can-help">See all {service.support.length} areas <span aria-hidden="true">↓</span></a>}
              <a href={inquiryPath(service)}>{service.cta} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>
      <section className="service-about section-wrap" aria-labelledby="service-about-title">
        <SectionHeading number="02" eyebrow="THE SERVICE" title={<>More clarity around the work that <em>matters.</em></>} id="service-about-title" className="service-about-heading" />
        <div className="service-about-body">
          {overview.map((paragraph, index) => <p className={index === 0 ? 'service-about-lead' : undefined} key={paragraph}>{paragraph}</p>)}
          <p className="service-note"><span>Please note</span>Support is tailored to your business needs. Finova does not promise specific legal, financial, tax, or regulatory outcomes.</p>
        </div>
      </section>
      <section className="service-support-section" id="how-we-can-help">
        <div className="section-wrap service-support-wrap">
          <SectionHeading number="03" eyebrow="HOW WE CAN HELP" title={<>Practical support, shaped around <em>your business.</em></>} description={`Here are some of the ways we can help with ${service.name.toLowerCase()}.`} />
          <ul className="support-list">{service.support.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ul>
        </div>
      </section>
      <section className="service-benefit section-wrap">
        <div className="service-benefit-content"><SectionHeading number="04" eyebrow="WORKING WITH FINOVA" title={service.benefit} description="We begin by understanding your priorities and the kind of support that would be useful." /><a className="button button--ink" href={inquiryPath(service)}>{service.cta} <span aria-hidden="true">↗</span></a></div>
      </section>
      <section className="related-services">
        <div className="section-wrap"><div className="related-heading"><SectionHeading number="05" eyebrow="MORE FROM FINOVA" title="Explore related support." description="These services may also help with the priorities you’re working through." /><a className="button button--ink" href="/services">View all services <span aria-hidden="true">↗</span></a></div><div className="related-links">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><span>{item.mark}</span><strong>{item.name}</strong><b aria-hidden="true">↗</b></a>)}</div></div>
      </section>
    </main>
  )
}
