/**
 * Finova inquiry receiver — Google Apps Script bound to the "Customer Enquiries" spreadsheet.
 * Paste into Extensions → Apps Script, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the /exec URL in VITE_INQUIRY_ENDPOINT.
 *
 * Expects a JSON body { name, email, service, message } and replies with JSON:
 *   { ok: true }                      row saved (and notification attempted)
 *   { ok: false, error: '<reason>' }  rejected or failed; nothing is reported to the visitor as sent
 */

const SHEET_NAME = 'Enquiries'
const NOTIFY_TO = 'khushrajsingh13s@gmail.com'
const ALLOWED_SERVICES = [
  'General Enquiry',
  'Business Formation & Registration',
  'Bookkeeping & Payroll Services',
  'Business Administration & Support',
  'Marketing & Business Collaborations',
  'Human Resources & Employee Services',
  'Business Consulting & Operational Support',
] // keep in sync with the service names in src/data/services.js
const LIMITS = { name: 120, email: 254, service: 80, message: 5000 }
const MAX_PER_MINUTE = 10 // across all visitors; crude flood protection only

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    const entry = {}
    for (const key of Object.keys(LIMITS)) {
      const value = typeof data[key] === 'string' ? data[key].trim() : ''
      if (!value) return json({ ok: false, error: `Missing ${key}` })
      if (value.length > LIMITS[key]) return json({ ok: false, error: `${key} is too long` })
      entry[key] = value
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) return json({ ok: false, error: 'Invalid email' })
    if (ALLOWED_SERVICES.indexOf(entry.service) === -1) return json({ ok: false, error: 'Unknown service' })

    const cache = CacheService.getScriptCache()
    const bucket = 'rate-' + Math.floor(Date.now() / 60000)
    const count = Number(cache.get(bucket) || 0)
    if (count >= MAX_PER_MINUTE) return json({ ok: false, error: 'Too many requests' })
    cache.put(bucket, String(count + 1), 120)

    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      if (!sheet) return json({ ok: false, error: 'Sheet not found' })
      sheet.appendRow([new Date(), cell(entry.name), cell(entry.email), cell(entry.service), cell(entry.message)])
    } finally {
      lock.releaseLock()
    }

    // The row is the record of truth; a mail failure is logged but does not fail the submission.
    try {
      MailApp.sendEmail({
        to: NOTIFY_TO,
        replyTo: entry.email,
        subject: `New enquiry — ${entry.service} — ${entry.name}`,
        body: [`Name: ${entry.name}`, `Email: ${entry.email}`, `Service: ${entry.service}`, '', entry.message].join('\n'),
      })
    } catch (mailError) {
      console.error('Notification email failed', mailError)
    }

    return json({ ok: true })
  } catch (error) {
    console.error(error)
    return json({ ok: false, error: 'Server error' })
  }
}

// Stops values such as "=HYPERLINK(...)" being run as spreadsheet formulas.
function cell(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
