import React, { useState } from 'react'
import SectionHeading from './SectionHeading'
import whyFinovaValues from '../data/whyFinova'

export default function WhyFinova({ number = '04' }) {
  const [pinnedValue, setPinnedValue] = useState(0)
  const [hoveredValue, setHoveredValue] = useState(null)
  const headingId = `why-finova-heading-${number}`

  return (
    <section className="why why-finova-section section-wrap" aria-labelledby={headingId}>
      <div className="why-intro">
        <SectionHeading
          number={number}
          eyebrow="WHY FINOVA"
          title={<>A more dependable way to run your <em>business.</em></>}
          description="Good support makes the everyday feel more manageable—and helps you keep moving with confidence."
          id={headingId}
        />
      </div>
      <div className="why-boxes" aria-label="Why choose Finova" onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHoveredValue(null) }}>
        {whyFinovaValues.map(([title, description, note], index) => {
          const isOpen = (hoveredValue ?? pinnedValue) === index
          const panelId = `why-finova-panel-${number}-${index + 1}`
          return (
            <article className={`why-box${isOpen ? ' is-open' : ''}`} key={title} onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHoveredValue(index) }}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={panelId} onFocus={() => setHoveredValue(index)} onBlur={() => setHoveredValue(null)} onClick={() => { setHoveredValue(null); setPinnedValue(pinnedValue === index && hoveredValue === null ? null : index) }}>
                  <span className="value-count">0{index + 1}</span>
                  <span className="why-box-title">{title}</span>
                  <span className="why-box-toggle" aria-hidden="true">↗</span>
                </button>
              </h3>
              <div className="why-box-panel" id={panelId} aria-hidden={!isOpen}>
                <div className="why-box-panel-inner">
                  <p>{description}</p>
                  <div className="why-box-note"><span>IN PRACTICE</span>{note}</div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
