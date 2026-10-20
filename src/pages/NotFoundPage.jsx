import React from 'react'

export default function NotFoundPage() {
  return (
    <main id="main" className="not-found section-wrap">
      <p className="eyebrow"><span className="eyebrow-rule" />PAGE NOT FOUND</p>
      <h1>Let’s get you <em>back on track.</em></h1>
      <p>This page may have moved. Visit our services or return to the homepage.</p>
      <div className="hero-actions"><a className="button button--ink" href="/services">Explore services <span aria-hidden="true">↗</span></a><a className="text-link text-link--dark" href="/">Back home <span aria-hidden="true">↗</span></a></div>
    </main>
  )
}
