# Apostle Dr. Samuel Letang — Portfolio Website

A fast, elegant, single-page portfolio site for **Apostle Dr. Samuel Letang** —
Senior Pastor of Tlokweng Assembly of God (Botswana), former President of Assembly
Bible College, and a respected voice on Christian & transformational leadership.

Built as a **static site** (plain HTML + CSS + a little JavaScript). No build step,
no framework — it runs anywhere and is easy to maintain.

---

## 📁 Project structure

```
dr-samuel-letang/
├── index.html              ← all page content & sections
├── assets/
│   ├── css/styles.css      ← all styling (colours, layout, responsive)
│   ├── js/main.js          ← nav, scroll animations, the SERMON LIST
│   └── img/                ← optimized web images (see below)
├── Pics/                   ← original high-res photos (not used by the site)
└── .claude/launch.json     ← local preview config (optional)
```

---

## ✏️ How to edit the content

Everything is plain text — open the files in any editor (VS Code, Notepad++, etc.).

| What you want to change | Where |
|---|---|
| Bio / about text, titles, credentials | `index.html` → `<section id="about">` |
| Career timeline (years & milestones) | `index.html` → `<section id="journey">` |
| Leadership pillars & the pull-quote | `index.html` → `<section id="leadership">` |
| **Sermons / messages** | `assets/js/main.js` → the `MESSAGES` list at the top |
| **Book** (*Looking Up to Master Jesus*) | `index.html` → `<section id="book">` |
| **Articles / publications** | `index.html` → `<section id="writing">` |
| Church info, service times, contact | `index.html` → `church` and `contact` sections |
| Colours & fonts | `assets/css/styles.css` → the `:root` block at the top |

### Adding a sermon
Open `assets/js/main.js` and add a line to the `MESSAGES` list:
```js
{ series: "Faith Series", title: "Your Sermon Title", scripture: "John 3:16",
  url: "https://link-to-the-video-or-post" },
```
`series`, `scripture`, and `url` are all optional.

### Adding a real article / publication  ⚠️ IMPORTANT
The three cards in the **Writing & Thought Leadership** section are **placeholders**.
Replace the title, category, summary, and link in each `<article>` block with
Dr. Letang's actual articles/papers. See the `EDITOR'S NOTE` comment in that section.

> **Note on the "University of Botswana articles":** during research we could verify
> his **University of South Africa (UNISA)** study in Christian Spirituality and his
> link to **Global University**, but we could **not** find specific University of
> Botswana publications under his name online. Rather than invent citations, this
> section is left as an editable template — please paste the real article titles,
> outlets, years, and links when available.

### The book section (*Looking Up to Master Jesus*, Oct 2026)
- The cover shown is a **designed placeholder mockup** at `assets/img/book-cover.svg`.
  Replace that file with the real cover artwork (any image — update the `src` in the
  `#book` section if you change the filename/extension).
- The blurb, the "what's inside" bullets, and the release line are **seeded copy** —
  edit them in `index.html` → `<section id="book">` to match the final description.
- The **"Register Your Interest"** button opens an email to `info@tlokwengaog.com`.
  Swap it for a real pre-order / mailing-list link when one exists.

### Swapping a photo
1. Put the new photo in `assets/img/` (or re-use one from `Pics/`).
2. Keep file sizes small (≈1400px wide, under ~250 KB) so the site stays fast.
3. Update the matching `src="assets/img/..."` in `index.html`.

Current images: `hero.jpg`, `portrait.jpg`, `preaching-1..4.jpg`, `prayer.jpg`,
`couple.jpg`, `congregation.jpg`, `leadership-grads.jpg` (Leadership feature),
`gallery-community.jpg`, `gallery-smile.jpg`, `gallery-leaders.jpg`,
`gallery-worship.jpg`, `book-cover.svg` (placeholder), `favicon.svg`.

---

## ▶️ Preview it locally

Any static server works. Two easy options:

```bash
# Option A — Node (no install)
npx serve .

# Option B — Python
python -m http.server 4321
```
Then open the printed URL (e.g. http://localhost:4321) in a browser.

---

## 🚀 Deploying (free options)

- **Netlify Drop** — go to https://app.netlify.com/drop and drag this whole folder
  in. Live in seconds. (Easiest.)
- **GitHub Pages** — push the folder to a repo, then Settings → Pages → deploy from
  the `main` branch root.
- **Vercel / Cloudflare Pages** — point them at the folder; framework preset = "Other".

A custom domain (e.g. `samuelletang.org`) can be connected in any of the above.

---

## ✅ Sources used for the content
All factual content was drawn from public sources, including:
- Tlokweng Assembly of God — https://www.tlokwengaog.org/about
- Assemblies of God Botswana materials & Assembly Bible College prospectus
- Global University School for Ministry Development catalog
- Public Facebook / TikTok ministry pages

Please review all copy and confirm details (dates, titles, qualifications) before
publishing — and replace the placeholder publications with real ones.

---
*Tip: the colour palette and fonts are defined once at the top of `styles.css`
(`:root`), so the whole site can be re-themed in a few lines.*
