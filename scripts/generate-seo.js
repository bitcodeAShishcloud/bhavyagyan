import { readFile, writeFile } from 'node:fs/promises';
import { pages } from '../src/seo.js';

const site = (process.env.VITE_SITE_URL || 'https://www.bhavyagyan.com').replace(/\/$/, '');
const origin = new URL(site);
if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash) {
  throw new Error('VITE_SITE_URL must be an HTTP(S) origin without a path.');
}
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = await readFile('dist/index.html', 'utf8');
const image = `${site}/pdf-assets/official-logo.png`;
const schema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${site}/#academy`,
  name: 'BhavyaGyan Academy',
  url: `${site}/`,
  logo: image,
  telephone: '+91-9031203310',
  email: 'info@bhavyagyan.com',
  description: 'Concept-focused guidance for JEE, NEET and Foundation students.'
};
for (const [path, [title, description]] of Object.entries(pages)) {
  const fullTitle = `${title} | BhavyaGyan Academy`;
  const url = `${site}${path}`;
  const tags = `<link rel="canonical" href="${escape(url)}"/>` +
    `<meta property="og:title" content="${escape(fullTitle)}"/>` +
    `<meta property="og:description" content="${escape(description)}"/>` +
    `<meta property="og:url" content="${escape(url)}"/>` +
    `<meta name="twitter:title" content="${escape(fullTitle)}"/>` +
    `<meta name="twitter:description" content="${escape(description)}"/>` +
    `<meta name="twitter:image" content="${escape(image)}"/>` +
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${escape(description)}"/>`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?\s*>/, `<meta property="og:image" content="${escape(image)}"/>`)
    .replace('</head>', `${tags}</head>`);
  await writeFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, html);
}
const urls = Object.keys(pages).map(path => `  <url><loc>${escape(site + path)}</loc></url>`).join('\n');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
