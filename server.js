// ============================================================
//  AdOpsDesk — server.js
//  Plain-English Programmatic & AdOps Glossary
// ============================================================
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Helpers ─────────────────────────────────────────────────
function loadData() {
  const terms      = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'terms.json'),      'utf8'));
  const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'categories.json'), 'utf8'));
  return { terms, categories };
}

// ── Static files (HTML / CSS / JS) ──────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── API: get all terms + categories ─────────────────────────
// Frontend calls this once on load to get all data
app.get('/api/data', (req, res) => {
  try {
    res.json(loadData());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
});

// ── API: search terms ────────────────────────────────────────
// GET /api/search?q=rtb
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json([]);
  try {
    const { terms } = loadData();
    const results = terms.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      (t.abbr       && t.abbr.toLowerCase().includes(q))       ||
      (t.aka        && t.aka.toLowerCase().includes(q))        ||
      (t.definition && t.definition.toLowerCase().includes(q))
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// ── API: single term by id ───────────────────────────────────
// GET /api/terms/rtb
app.get('/api/terms/:id', (req, res) => {
  try {
    const { terms } = loadData();
    const term = terms.find(t => t.id === req.params.id);
    if (!term) return res.status(404).json({ error: 'Term not found' });
    res.json(term);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load term' });
  }
});

// ── API: all terms in a category ─────────────────────────────
// GET /api/categories/programmatic
app.get('/api/categories/:id', (req, res) => {
  try {
    const { terms, categories } = loadData();
    const cat = categories.find(c => c.id === req.params.id);
    if (!cat) return res.status(404).json({ error: 'Category not found' });
    res.json({
      category : cat,
      terms    : terms.filter(t => t.category === req.params.id)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load category' });
  }
});

// ── Catch-all: serve the SPA for every other route ──────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ AdOpsDesk running → http://localhost:${PORT}`);
  console.log(`   Terms loaded       → ${loadData().terms.length}`);
  console.log(`   Categories loaded  → ${loadData().categories.length}`);
});
