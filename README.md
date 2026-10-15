# AdOpsDesk 🎯
**Plain-English Programmatic & AdOps Glossary**

A Node.js web application with 77+ terms covering RTB, DSP, SSP, CPM, CTV, and everything in between.

---

## 📁 File Structure

```
adopsdesk/
├── server.js          ← The web server (don't need to edit this)
├── package.json       ← App config (don't need to edit this)
├── README.md          ← This file
│
├── data/
│   ├── terms.json     ← ✏️  ADD / EDIT TERMS HERE
│   └── categories.json← ✏️  ADD / EDIT CATEGORIES HERE
│
└── public/
    └── index.html     ← The website frontend
```

---

## ✏️ How to Add a New Term

Open `data/terms.json` and add a new object to the array. Copy this template:

```json
{
  "id": "your-term-id",
  "name": "Term Name — Full Name",
  "abbr": "Full Name",
  "aka": "Also Known As, Other Name",
  "category": "programmatic",
  "short": "One sentence summary of the term.",
  "definition": "Full paragraph definition in plain English.",
  "whyItMatters": "Why advertisers or publishers need to know this.",
  "example": "A real-world example explaining the concept.",
  "related": ["rtb", "dsp", "cpm"]
}
```

**Category options:** `programmatic` | `ad-serving` | `measurement` | `audience` | `formats` | `tech`

**Rules:**
- `id` must be unique, lowercase, hyphens only (e.g. `"the-trade-desk"`)
- `abbr`, `aka`, `whyItMatters`, `example`, `related` are all optional
- `name`, `category`, `short`, `definition` are required

---

## 🚀 Run Locally (on your computer)

**You need Node.js installed first:** https://nodejs.org (download the LTS version)

Then open Terminal / Command Prompt and run:

```bash
# 1. Go into the project folder
cd adopsdesk

# 2. Install Express (one time only)
npm install

# 3. Start the server
npm start
```

Open your browser and go to: **http://localhost:3000**

---

## 🌐 Deploy Free on Render.com

1. Create a free account at **render.com**
2. Push this folder to a GitHub repository (github.com)
3. In Render → click **"New Web Service"**
4. Connect your GitHub repo
5. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click **Deploy**

Your site will be live at `https://adopsdesk.onrender.com`

---

## 🔌 API Endpoints

Your server also exposes these API endpoints (useful for future features):

| Endpoint | Description |
|----------|-------------|
| `GET /api/data` | All terms + categories |
| `GET /api/search?q=rtb` | Search terms |
| `GET /api/terms/rtb` | Single term by ID |
| `GET /api/categories/programmatic` | Terms in a category |

---

## 📊 Stats
- **77+ terms** across 6 categories
- **Built with:** Node.js + Express + Vanilla JS
- **No database needed** — all data in JSON files
