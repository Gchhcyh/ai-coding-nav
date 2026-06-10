const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ai-coding-nav.pages.dev';
const tools = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'tools.json'), 'utf-8'));

const urls = [
  { loc: `${BASE_URL}/`, priority: '1.00' },
  ...tools.map(t => ({
    loc: `${BASE_URL}/tools/${t.slug}`,
    priority: t.featured ? '0.90' : '0.80',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap, 'utf-8');
console.log(`Sitemap generated: ${urls.length} URLs`);

// Also write to out/ so Cloudflare Pages deploys the latest sitemap
const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`Also written to out/sitemap.xml`);
}
