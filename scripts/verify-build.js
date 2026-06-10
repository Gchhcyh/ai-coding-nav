const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DATA_DIR = path.join(__dirname, '..', 'data');

let errors = 0;
let passes = 0;

function check(label, fn) {
  try {
    const ok = fn();
    if (ok) {
      console.log(`  ✅ ${label}`);
      passes++;
    } else {
      console.log(`  ❌ ${label}`);
      errors++;
    }
  } catch (e) {
    console.log(`  ❌ ${label} — ${e.message}`);
    errors++;
  }
}

console.log('AI Coding Nav — Build Verification\n');

// 1. Output directory
console.log('Build Output:');
check('out/ directory exists', () => fs.existsSync(OUT_DIR));
check('out/index.html exists', () => fs.existsSync(path.join(OUT_DIR, 'index.html')));
check('out/404.html exists', () => fs.existsSync(path.join(OUT_DIR, '404.html')));

// 2. Sitemap
console.log('\nSEO Files:');
check('sitemap.xml exists', () => fs.existsSync(path.join(PUBLIC_DIR, 'sitemap.xml')));
check('robots.txt exists', () => fs.existsSync(path.join(PUBLIC_DIR, 'robots.txt')));
check('og-image.png exists', () => fs.existsSync(path.join(PUBLIC_DIR, 'og-image.png')));
check('favicon.ico exists', () => fs.existsSync(path.join(PUBLIC_DIR, 'favicon.ico')));

// 3. Tool pages count
console.log('\nTool Pages:');
const tools = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'tools.json'), 'utf-8'));
const toolsDir = path.join(OUT_DIR, 'tools');
if (fs.existsSync(toolsDir)) {
  const htmlFiles = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.html'));
  check(`tools/ pages: ${htmlFiles.length} (expected ${tools.length})`,
    () => htmlFiles.length === tools.length);
  
  // Check specific tool pages exist
  const sample = ['cursor', 'claude-code', 'applitools', 'keploy'];
  sample.forEach(slug => {
    check(`  tools/${slug}.html exists`,
      () => fs.existsSync(path.join(toolsDir, `${slug}.html`)));
  });
} else {
  check('tools/ directory exists', () => false);
}

// 4. Categories check
console.log('\nCategories:');
const categories = {};
tools.forEach(t => { categories[t.category] = (categories[t.category] || 0) + 1; });
const expectedCats = {
  'ai-ide': 18, 'agent-framework': 13, 'mcp-tools': 15,
  'code-review': 9, 'testing-qa': 10, 'dev-tools': 19,
};
Object.entries(expectedCats).forEach(([cat, expected]) => {
  check(`${cat}: ${categories[cat] || 0} (expected ${expected})`,
    () => (categories[cat] || 0) === expected);
});

console.log(`\n${passes} passed, ${errors} failed`);
process.exit(errors > 0 ? 1 : 0);
