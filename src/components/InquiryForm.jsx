import React, { useEffect, useMemo, useRef, useState } from 'react'
import { generalEnquiry, resolveInquiryServiceQuery, services, serviceByQuery } from '../data/services'
import { createInquiryMailto, inquiryDeliveryMode, inquiryRecipient, submitInquiry } from '../lib/inquirySubmission'

const fieldDefinitions = {
  fullName: { required: true, label: 'Name', autoComplete: 'name', placeholder: 'Your full name' },
  email: { required: true, label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  service: { required: true, label: 'Service', futureQuestions: generalEnquiry.futureQuestions },
  message: { required: true, label: 'Message', placeholder: 'Tell us about your business and what you need help with.' },
}

function initialServiceQuery() {
  return resolveInquiryServiceQuery(window.location.search)
}

export default function InquiryForm() {
  const [serviceQuery, setServiceQuery] = useState(initialServiceQuery)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')
  const [status, setStatus] = useState('idle')
  const [submitting, setSubmitting] = useState(false)
  const [focusRequest, setFocusRequest] = useState(0)
  const [sent, setSent] = useState(null)
  const formRef = useRef(null)
  const successHeadingRef = useRef(null)
  const showingSuccess = useRef(false)
  const activeService = useMemo(() => serviceByQuery(serviceQuery) || generalEnquiry, [serviceQuery])
  const additionalQuestions = activeService.inquiry?.questions || []

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('service', serviceQuery)
    window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}`)
  }, [serviceQuery])

  // Runs after React has committed aria-invalid, so the first highlighted field gets focus with its error attached.
  useEffect(() => {
    if (focusRequest) formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
  }, [focusRequest])

  // Moves focus to the confirmation when it appears, and back to the first field when the form returns.
  useEffect(() => {
    if (sent) successHeadingRef.current?.focus()
    else if (showingSuccess.current) formRef.current?.elements.fullName?.focus()
    showingSuccess.current = Boolean(sent)
  }, [sent])

  const sendAnother = () => {
    setSent(null)
    setNotice('')
    setStatus('idle')
  }

  const clearError = (name) => {
    setErrors((current) => current[name] ? { ...current, [name]: '' } : current)
    setNotice('')
    setStatus('idle')
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const form = formRef.current
    if (!form) return
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())
    const nextErrors = {}

    if (!String(values.fullName || '').trim()) nextErrors.fullName = 'Enter your name.'
    if (!String(values.email || '').trim()) nextErrors.email = 'Enter your email address.'
    else if (!form.elements.email.validity.valid) nextErrors.email = 'Enter a valid email address.'
    if (!values.service) nextErrors.service = 'Choose the service you need.'
    if (!String(values.message || '').trim()) nextErrors.message = 'Tell us a little about what you need.'
    additionalQuestions.forEach((question) => {
      if (question.required && !String(values[question.name] || '').trim()) nextErrors[question.name] = `Enter ${question.label.toLowerCase()}.`
    })
    const serviceErrors = activeService.inquiry?.validate?.(values) || {}
    Object.assign(nextErrors, serviceErrors)

    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) {
      setNotice('Please review the highlighted fields.')
      setStatus('error')
      setFocusRequest((count) => count + 1)
      return
    }

    const selected = values.service === generalEnquiry.query ? generalEnquiry.name : activeService.name
    // Property names match the Apps Script (and the sheet columns Name, Email, Service, Message).
    const payload = {
      name: String(values.fullName).trim(),
      email: String(values.email).trim(),
      service: selected,
      message: String(values.message).trim(),
    }
    const adapter = activeService.inquiry?.submissionAdapter || (inquiryDeliveryMode === 'endpoint' ? submitInquiry : null)
    if (adapter) {
      setSubmitting(true)
      setNotice('Sending your inquiry…')
      setStatus('idle')
      try {
        // Spam trap: a filled hidden field skips delivery and shows the error, never the thank-you screen.
        if (values.field_x9) throw new Error('Hidden spam-trap field was filled; inquiry not sent')
        await adapter(payload)
        setServiceQuery(values.service)
        setNotice('')
        setStatus('idle')
        setSent({ name: payload.name, email: payload.email, service: payload.service })
      } catch (error) {
        console.error('Inquiry submission failed:', error)
        setNotice('error')
        setStatus('error')
      } finally {
        setSubmitting(false)
      }
      return
    }

    setNotice(`Your email app should open with the inquiry ready. Send it there to complete your request. If it does not open, email ${inquiryRecipient}.`)
    setStatus('idle')
    window.location.href = createInquiryMailto(payload)
  }

  if (sent) {
    return (
      <div className="inquiry-form-panel inquiry-success">
        <span className="inquiry-success-mark" aria-hidden="true">✓</span>
        <h2 className="form-heading" ref={successHeadingRef} tabIndex={-1}>Thank you, {sent.name.split(/\s+/)[0]}. Your inquiry has been sent.</h2>
        <p className="form-intro">We’ve received your inquiry and will reply by email to <strong>{sent.email}</strong>.</p>
        <dl className="inquiry-success-summary">
          <div><dt>Service</dt><dd>{sent.service}</dd></div>
          <div><dt>Reply to</dt><dd>{sent.email}</dd></div>
        </dl>
        <div className="inquiry-success-actions">
          <button className="button button--ink" type="button" onClick={sendAnother}>Send another inquiry <span aria-hidden="true">↗</span></button>
          <a className="inquiry-success-home" href="/">Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="inquiry-form-panel">
      <h2 className="form-heading" id="inquiry-form-title">Send an inquiry</h2>
      <p className="form-intro">All fields are required.</p>
      <form ref={formRef} onSubmit={submit} noValidate aria-labelledby="inquiry-form-title" aria-busy={submitting}>
        <div className="form-trap" aria-hidden="true">
          <label htmlFor="inquiry-field-x9">Leave this field empty</label>
          <input id="inquiry-field-x9" name="field_x9" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore="true" data-lpignore="true" data-form-type="other" />
        </div>
        <div className="form-grid">
          {['fullName', 'email'].map((name) => {
            const field = fieldDefinitions[name]
            const id = `inquiry-${name}`
            return (
              <div className="form-field" key={name}>
                <label htmlFor={id}>{field.label} {field.required ? <span aria-hidden="true">*</span> : <span className="optional">Optional</span>}</label>
                <input id={id} name={name} type={field.type || 'text'} autoComplete={field.autoComplete} placeholder={field.placeholder} required={field.required} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-error` : undefined} onChange={() => clearError(name)} />
                {errors[name] && <span className="field-error" id={`${id}-error`}>{errors[name]}</span>}
              </div>
            )
          })}
          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-service">{fieldDefinitions.service.label} <span aria-hidden="true">*</span></label>
            <div className="select-control">
            <select id="inquiry-service" name="service" required value={serviceQuery} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'inquiry-service-error' : undefined} onChange={(event) => { setServiceQuery(event.target.value); clearError('service') }}>
              <option value={generalEnquiry.query}>{generalEnquiry.name}</option>
              {services.map((service) => <option key={service.slug} value={service.query}>{service.name}</option>)}
            </select>
            </div>
            {errors.service && <span className="field-error" id="inquiry-service-error">{errors.service}</span>}
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-message">{fieldDefinitions.message.label} <span aria-hidden="true">*</span></label>
            <textarea id="inquiry-message" name="message" rows="4" maxLength={5000} placeholder={fieldDefinitions.message.placeholder} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'inquiry-message-error' : undefined} onChange={() => clearError('message')} />
            {errors.message && <span className="field-error" id="inquiry-message-error">{errors.message}</span>}
          </div>
          {additionalQuestions.map((question) => (
            <div className={`form-field${question.wide ? ' form-field--wide' : ''}`} key={question.name}>
              <label htmlFor={`inquiry-${question.name}`}>{question.label} {question.required && <span aria-hidden="true">*</span>}</label>
              {question.type === 'textarea' ? (
                <textarea id={`inquiry-${question.name}`} name={question.name} rows="3" required={question.required} aria-invalid={Boolean(errors[question.name])} aria-describedby={errors[question.name] ? `inquiry-${question.name}-error` : undefined} onChange={() => clearError(question.name)} />
              ) : question.type === 'select' ? (
                <select id={`inquiry-${question.name}`} name={question.name} required={question.required} aria-invalid={Boolean(errors[question.name])} aria-describedby={errors[question.name] ? `inquiry-${question.name}-error` : undefined} onChange={() => clearError(question.name)}>
                  <option value="">Choose an option</option>{question.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              ) : (
                <input id={`inquiry-${question.name}`} name={question.name} type={question.type || 'text'} required={question.required} aria-invalid={Boolean(errors[question.name])} aria-describedby={errors[question.name] ? `inquiry-${question.name}-error` : undefined} onChange={() => clearError(question.name)} />
              )}
              {errors[question.name] && <span className="field-error" id={`inquiry-${question.name}-error`}>{errors[question.name]}</span>}
            </div>
          ))}
        </div>
        <div className="form-submit-row">
          <button className="button button--ink form-submit" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Inquiry'} <span aria-hidden="true">↗</span></button>
        </div>
        <p className={`form-status${status === 'error' ? ' form-status--error' : ''}${status === 'success' ? ' form-status--success' : ''}`} aria-live="polite" role="status">
          {notice === 'error' ? <>Your inquiry could not be sent. Please try again, or email <a href={`mailto:${inquiryRecipient}`}>{inquiryRecipient}</a>.</> : notice}
        </p>
      </form>
      {inquiryDeliveryMode === 'email' && <p className="form-handoff">The form opens your email app to send your inquiry. No message is submitted from this page.</p>}
    </div>
  )
}
