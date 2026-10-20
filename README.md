# Finova Business Solutions

React + Vite business website. Start locally with `npm install` and `npm run dev`; create a production build with `npm run build` (output in `dist/`).

## Configuration

Build-time settings live in `.env`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | Yes, for `npm run build` | Production origin without a trailing slash, e.g. `https://finovabusiness.com`. Used for canonical URLs, Open Graph/Twitter tags, JSON-LD, `sitemap.xml` and `robots.txt`. The build stops if it is missing. Confirm whether the live site uses the apex domain or `www` before launch. |
| `VITE_INQUIRY_ENDPOINT` | No | Google Apps Script web app URL (ends in `/exec`) that receives inquiry form submissions. When empty, the form opens the visitor's email app instead. |

These values are compiled into the public site. Never put secrets or API keys in them.

## Inquiry form

The form (`src/components/InquiryForm.jsx`) asks for name, email, service and message. The service list comes from `src/data/services.js` plus “General Enquiry”.

Submissions go to a Google Apps Script web app that appends a row to the **Customer Enquiries** spreadsheet (tab **Enquiries**: Timestamp, Name, Email, Service, Message) and emails a notification to `khushrajsingh13s@gmail.com`. The script generates the timestamp. The reference script is in `apps-script/Code.gs`.

### Setup

1. Open the spreadsheet → Extensions → Apps Script, and paste in `apps-script/Code.gs`.
2. Deploy → New deployment → Web app, with **Execute as: Me** and **Who has access: Anyone**. Approve the Sheets and Gmail permissions.
3. Copy the URL ending in `/exec` into `VITE_INQUIRY_ENDPOINT` in `.env`, then run `npm run build`.
4. When you add, rename or remove a service in `src/data/services.js`, update `ALLOWED_SERVICES` in the script and create a new deployment version.

### How delivery is confirmed

`src/lib/inquirySubmission.js` POSTs `{ name, email, service, message }` as JSON with a `text/plain` content type. That keeps it a simple CORS request, so the browser doesn't send a preflight, which Apps Script can't answer. Apps Script redirects to `script.googleusercontent.com`, which allows any origin, so the page can read the reply. The form reports success only when the script replies `{ "ok": true }`. A network error, a non-2xx status, a non-JSON reply (for example a Google sign-in page when the deployment isn't public), `{ "ok": false }` or a 20-second timeout shows an error, and the visitor's text stays in the form. `no-cors` is not used because its responses are opaque and can't confirm anything.

`ok: true` means the row was saved. The script sends the email afterwards, and a mail failure (for example the daily Gmail quota) is logged in Apps Script → Executions without failing the submission.

### Spam and abuse

The script checks required fields, lengths, email format and the service against an allow-list. It also neutralises formula-like values before writing to the sheet and caps total submissions at 10 per minute. The form has a hidden `website` honeypot, and filled submissions are not sent. None of this stops a determined bot, because the `/exec` URL is public and can be called directly. Before relying on the form in production, consider adding a CAPTCHA such as Cloudflare Turnstile or reCAPTCHA, verified inside the script. Also keep an eye on the Apps Script daily email quota (about 100/day on a consumer Gmail account).

## SEO and metadata

`src/data/siteMeta.js` holds each route's title, description and structured data. During `npm run build`, the plugin in `vite.config.js` writes a static HTML file for every route (`about.html`, `services/<slug>.html`, …) with the correct `<title>`, description, canonical URL, Open Graph/Twitter tags and JSON-LD. It also writes `404.html` (noindex), `sitemap.xml` and `robots.txt`, so crawlers and link previews do not need JavaScript. The app also updates the head at runtime.

The JSON-LD includes only verified details: business name, email, New Jersey (US) and the service list. Add a street address, phone number, opening hours or social profiles to `structuredData()` once they are confirmed.

## Brand assets

- `src/assets/finova-logo.webp`: the site logo (480×320, transparent), used by the header, footer and loader.
- `public/`: favicon set, `site.webmanifest`, `og-image.jpg` (1200×630 social preview) and `finova-logo.png` (logo for structured data).
- `brand/finova-logo-source.png`: original 1536×1024 artwork. It is not shipped with the site; use it to regenerate assets.

## Hosting (Apache)

`public/.htaccess` is copied into `dist/`. It requires `mod_rewrite` and `AllowOverride` and:

- serves each route's prerendered file (`/about` → `about.html`, `/services/<slug>` → `services/<slug>.html`);
- 301-redirects trailing slashes, `.html` URLs and the older service slugs (e.g. `/services/payroll`) to their canonical URLs;
- returns a real 404 status with `404.html` for unknown paths;
- caches fingerprinted files in `/assets` for a year (with `mod_headers`).

Upload the whole contents of `dist/`, including `.htaccess`, to the web root. If the site is later hosted somewhere other than Apache (Netlify, Vercel, Cloudflare Pages, nginx), equivalent rewrite, redirect and 404 rules are needed for that platform.
