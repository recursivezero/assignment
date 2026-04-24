# QuotePaper

A browser-based tool to turn text quotes into downloadable wallpapers. No build step, no dependencies to install — open `index.html` in any browser and it works.

---

## What it does

Type a quote and author, pick a background theme, layout, font, canvas size, and decoration style, then download a high-resolution PNG.

---

## Features

- 8 background themes (dark and light)
- 4 text layout positions
- 3 font choices — Playfair Display, Cormorant Garamond, DM Mono
- 4 export sizes — 16:9 desktop, 9:16 mobile/story, 1:1 square, 4:3
- 4 decoration modes — line rule, large quote marks, decorative frame, minimal
- 30 built-in quotes with a random button
- High-res PNG download (scales from preview to full resolution)
- Keyboard shortcut: `Ctrl/Cmd + D` to download

---

## Getting started

```bash
git clone https://github.com/YOUR-USERNAME/assignment.git
cd assignment
git checkout task/quotepaper
```

Open `index.html` in a browser. No server or build step needed.

---

## Project structure

```
quotepaper/
├── index.html
└── src/
    ├── style.css
    ├── quotes.js
    └── app.js
```

`style.css` owns all visual logic including themes and layouts. `quotes.js` holds the quote dataset. `app.js` handles state and event binding — it only toggles CSS classes, it never touches colour or layout directly.

---

## How the download works

`html2canvas` captures the `.wallpaper-canvas` element and multiplies it by a scale factor equal to `targetWidth / previewWidth`. A 16:9 preview at 640px wide is captured at 1920px — same proportions, full resolution.

---

## Engineering notes

The app uses a single `state` object with five keys. Every button click updates one key and calls `applyClasses()`, which rebuilds the element's class list. CSS does all the visual work. Adding a new background theme means one CSS class and one button in the HTML — nothing else changes.

The quote dataset is local so the app runs fully offline and needs no API key.

---

## Possible improvements

- Custom background image upload
- Font size slider
- JPEG export for smaller file sizes
- LocalStorage to persist last-used settings
- Quote search or category filter

---

## Submission

Branch: `feature/quotepaper`  
PR target: `task/quotepaper` on the upstream repo
