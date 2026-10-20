import React from 'react'
import SectionHeading from './SectionHeading'

export default function PageIntro({ eyebrow, title, lead, number = '01' }) {
  return (
    <section className="page-intro section-wrap" aria-labelledby="page-title">
      <div className="page-intro-copy">
        <SectionHeading number={number} eyebrow={eyebrow} title={title} description={lead} id="page-title" as="h1" />
      </div>
      <span className="page-intro-mark" aria-hidden="true">F.</span>
    </section>
  )
}
