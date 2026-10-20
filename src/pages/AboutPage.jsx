import React from 'react'
import SectionHeading from '../components/SectionHeading'
import WhyFinova from '../components/WhyFinova'
import { services } from '../data/services'

export default function AboutPage() {
  return (
    <main id="main" className="inner-page">
      <section className="about-intro section-wrap" aria-labelledby="page-title">
        <SectionHeading number="01" eyebrow="ABOUT FINOVA" title={<>Your business deserves room to <em>grow.</em></>} id="page-title" as="h1" className="about-intro-heading" />
        <div className="about-intro-aside">
          <p className="about-intro-lead">Finova Business Solutions is a partner for the essential work behind your business, from getting established to keeping day-to-day operations organized.</p>
          <nav className="about-service-index" aria-label="Areas we support">
            <p className="about-service-index-label">Areas we support</p>
            <ol>
              {services.map((service) => (
                <li key={service.slug}><a href={`/services/${service.slug}`}><span className="about-service-mark" aria-hidden="true">{service.mark}</span><span className="about-service-name">{service.name}</span><span className="about-service-arrow" aria-hidden="true">↗</span></a></li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      <section className="about-story section-wrap" aria-labelledby="about-story-title">
        <SectionHeading number="02" eyebrow="WHO WE ARE" title={<>Practical support for the work behind your <em>work.</em></>} id="about-story-title" className="about-story-heading" />
        <div className="about-story-body">
          <p className="about-story-lead">Running a business should leave room to pursue opportunities and grow, not get buried in the day-to-day.</p>
          <div className="about-story-detail"><p>Finova Business Solutions brings together business formation and registration, bookkeeping and payroll, business administration, marketing and collaborations, human resources support, and operational consulting.</p><p>Our assistance is tailored to each business, with dependable communication throughout.</p></div>
        </div>
      </section>
      <section className="about-purpose">
        <div className="section-wrap about-purpose-inner">
          <SectionHeading number="03" eyebrow="WHAT GUIDES US" title={<>Built around your <em>business goals.</em></>} description="Our mission and vision shape the way we support the people building and growing their businesses." />
          <div className="about-purpose-columns">
            <article><span className="purpose-label">Our mission</span><p>To empower businesses with dependable, efficient, and accessible professional support services that simplify operations, encourage growth, and allow business owners to focus on achieving their goals.</p></article>
            <article><span className="purpose-label">Our vision</span><p>To become a trusted business solutions partner for entrepreneurs and growing businesses by delivering comprehensive support, building lasting relationships, and helping businesses thrive in an ever-changing marketplace.</p></article>
          </div>
        </div>
      </section>
      <WhyFinova number="04" />
      <section className="page-cta">
        <div className="section-wrap page-cta-inner">
          <SectionHeading eyebrow="A partner for your next step" title={<>Tell us what’s on your <em>plate.</em></>} description="Talk with us about the support that would make a difference to your day-to-day." light />
          <a className="button button--sage" href="/inquiry">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  )
}
