import React from 'react'

export default function SectionHeading({ number, eyebrow, title, description, id, className = '', light = false, action, as: Heading = 'h2' }) {
  const indexLine = (
    <div className={`section-index-line${light ? ' section-index-line--light' : ''}`}>
      {number && <span className="section-index">{number}</span>}
      <span>{eyebrow}</span>
    </div>
  )
  return (
    <header className={`section-heading${light ? ' section-heading--light' : ''}${className ? ` ${className}` : ''}`}>
      {action ? <div className="section-heading-top">{indexLine}{action}</div> : indexLine}
      <Heading id={id}>{title}</Heading>
      {description && <div className="section-heading-description">{description}</div>}
    </header>
  )
}
