export const inquiryRecipient = 'contact@finovabusiness.com'

// Set VITE_INQUIRY_ENDPOINT at build time to the Google Apps Script web app URL ending in /exec (see README).
// Without it, the form falls back to opening the visitor's email app with a prepared draft.
const endpoint = (import.meta.env.VITE_INQUIRY_ENDPOINT || '').trim()
const timeoutMs = 20000

export const inquiryDeliveryMode = endpoint ? 'endpoint' : 'email'

export function createInquiryMailto({ name, email, service, message }) {
  const subject = `Business inquiry — ${service}`
  const body = [`Name: ${name}`, `Email: ${email}`, `Service: ${service}`, '', message].join('\n')
  return `mailto:${inquiryRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Sent as text/plain so the browser makes a "simple" CORS request: Apps Script cannot answer an OPTIONS
// preflight, but its redirected response is readable, so success is only reported when the script itself
// replies with JSON { success: true }. Opaque (no-cors) responses are never treated as success.
export async function submitInquiry({ name, email, service, message }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name, email, service, message }),
      redirect: 'follow',
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Inquiry endpoint responded with ${response.status}`)
    let result
    try {
      result = await response.json()
    } catch {
      throw new Error('Inquiry endpoint did not return JSON')
    }
    if (result?.success !== true) {
      throw new Error(result?.error || result?.message || 'Inquiry endpoint did not confirm the submission')
    }
  } finally {
    clearTimeout(timer)
  }
}
