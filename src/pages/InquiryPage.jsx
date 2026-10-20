import React from 'react'
import InquiryForm from '../components/InquiryForm'
import SectionHeading from '../components/SectionHeading'
import { inquiryRecipient } from '../lib/inquirySubmission'

const nextSteps = [
  'Send a few details about your business and the support you need.',
  'We review your inquiry and the service you selected.',
  'We reply by email to talk through the next step.',
]

export default function InquiryPage() {
  return (
    <main id="main" className="inner-page inquiry-page">
      <section className="contact-page section-wrap" aria-labelledby="page-title">
        <div className="contact-intro">
          <SectionHeading number="01" eyebrow="CONTACT FINOVA" title={<>Let’s talk about your <em>business.</em></>} description="Tell us what you’re working on and the support you’re looking for. Send an inquiry using the form and we’ll reply by email." id="page-title" as="h1" />
        </div>
        <InquiryForm />
        <aside className="contact-details" aria-label="Contact details">
          <div className="contact-detail">
            <p className="contact-detail-label">Email us directly</p>
            <a className="contact-detail-link" href={`mailto:${inquiryRecipient}`}>{inquiryRecipient} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-detail">
            <p className="contact-detail-label">Based in</p>
            <p className="contact-detail-value">New Jersey, United States</p>
          </div>
          <div className="contact-detail">
            <p className="contact-detail-label">What happens next</p>
            <ol className="contact-steps">
              {nextSteps.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{step}</li>)}
            </ol>
          </div>
        </aside>
      </section>
    </main>
  )
}
