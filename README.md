# BhavyaGyan Academy website

A Vite + React website with client-side routes for courses, the academy, results, faculty, admissions and legal information.

## Development

```sh
npm install
npm run dev
npm run build
```

## Deployment and enquiries

Deploy `dist` behind HTTPS with SPA fallback to `/index.html`. Netlify (`public/_redirects`) and Vercel (`vercel.json`) rewrite configurations are included. Set `VITE_SITE_URL` at build time to the final public origin if it differs from `https://www.bhavyagyan.com`; this controls canonical and Open Graph URLs.

The default enquiry flow opens a prefilled WhatsApp message to the number supplied by the academy. The visitor must press Send in WhatsApp; the site cannot verify that they did so. To submit directly to a backend instead, set `VITE_ENQUIRY_ENDPOINT` at build time to an HTTPS endpoint accepting a JSON POST and returning a successful HTTP status only when an enquiry is actually received. Configure appropriate CORS, validation, spam protection, retention and privacy practices on that service before enabling it. Do not place secrets in Vite environment variables.

## Content to confirm

The standalone logo variants and reference design images named in the request were not present in the checkout. The official logo shown in the supplied PDF is used as the closest available asset, including for the favicon and social preview. Course dates, fees, schedules, availability, current campus address and visiting hours, and academy-specific payment and refund policies need confirmation. The classroom image is presented as an image from the brochure, not as a verified current campus photograph. Student results and staff details are sourced from the supplied PDF and user-provided information; verify and update before publication.

## Search visibility

The build generates a sitemap, robots file, academy structured data and separate HTML metadata for each public route. Netlify and Vercel route rules serve the matching HTML at the clean URL; on other hosts configure the same route-to-HTML rewrites before the SPA fallback. The page content itself is rendered by React, so search engines must run JavaScript to index the full page.

Before publishing, confirm the domain and build with `VITE_SITE_URL=https://your-domain.example npm run build`. The sitemap, canonical links and social preview URLs use that origin. After the site is live, the domain owner can add and verify the property in Google Search Console, then submit `https://your-domain.example/sitemap.xml`. Search Console verification and indexing require access to the domain or hosting provider and are not performed by this project.

The homepage's quick enquiry always opens WhatsApp, even when an endpoint is configured; the more detailed form on the contact page uses `VITE_ENQUIRY_ENDPOINT` when provided. A connected enquiry management service, team notifications, access controls and follow-up tracking require a separately selected and configured backend or provider.

Faculty portraits are stored in `public/portraits/`; obtain each educator's approval of their likeness before publication. The academy logo remains a separate, unaltered asset alongside the portraits.
