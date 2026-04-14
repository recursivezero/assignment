# Bilingual Dictionary

Here is a structured Product Plan Document for your bilingual vocabulary mobile app / PWA. It captures all your requirements — ideal for guiding development or prompting other AI agents.

---

📘 Product Plan: Bilingual Vocabulary Builder (Hindi-English)

1. 📌 Overview

A mobile-first PWA for building and managing bilingual (Hindi-English) word entries. Targeted at learners, kids, and personal use, the app works completely offline using IndexedDB and supports JSON import/export, responsive design, and customizable themes.

---

1. 🎯 Core Features

🔤 Add / Edit / Delete Word Entry

Fields:

english (required, lowercase only)

hindi (required)

example (optional)

type (noun, verb, etc.) — shown as colored chips (selectable, default is "noun")

category (like "fruit", "emotion") — also shown as chips

notes (optional)

Auto timestamps: createdAt, updatedAt

Duplicate check on [english + hindi] pair

🔍 Search

Instant search with auto-suggest

Works on both Hindi & English

Suggestion includes matched text highlight and direct meaning

Results displayed in order of match relevance

📇 Entry View

Tap to show popover:

Edit, Copy buttons

Delete with optional "Don't ask again" toggle

Show all details (highlighted Hindi/English depending on query)

📥 Import / 📤 Export

JSON Export of all data

JSON Import with schema validation:

Required: english, hindi

Optional: example, type, category, notes

Auto-add createdAt, updatedAt

Skips invalid or duplicate entries

Copy entry as plain text (just word + meaning)

⚙️ Settings

Theme toggle: Light / Dark / High Contrast

Delete confirm toggle

Export button (JSON)

Import button (JSON file upload)

PWA Install prompt

📦 Storage

Data stored in IndexedDB

Two stores:

vocab_entries

settings

---

1. 🖼 UI Design

Minimal, touch-optimized UI

Large text, chip-style selection, popover interactions

Responsive layout for phones, tablets

Accessible keyboard navigation (next field focus, arrows)

Example screen sections:

Home: Search + Recent Entries

Add/Edit: Entry form with smart field ordering

Detail: Card with all info, copy/download options

Settings: Preferences and import/export

---

1. 🌐 PWA Behavior

Fully installable on Android/iOS via browser

Service worker caches everything after first load

Works 100% offline

Custom manifest + icons

Export/download triggers use Blob API

---

1. 📁 Data Model

{
"id": 1234567890,
"english": "apple",
"hindi": "सेब",
"example": "An apple a day keeps the doctor away.",
"type": "noun",
"category": ["fruit"],
"notes": "Very common word",
"createdAt": 1711234567890,
"updatedAt": 1711234567890
}

---

1. 🛠️ Tech Stack

Vanilla JavaScript (ES Modules)

IndexedDB (via idb wrapper or direct)

CSS (modern layout, popover, scroll, container queries)

Vite (build tool)

Deployed via Netlify, Firebase Hosting, or GitHub Pages

---

1. 🧠 Extra Considerations

All inputs trimmed and converted to lowercase where needed

Auto-fill mode: If only Hindi is entered, auto-suggest from English too

Toggle to show all entries or filter by letter/date

Data can be grouped by type/category

Support long-press or copy icon for quick copy of Hindi/English

---

Would you like this exported as a PDF or Markdown file? I can also give you a prompt version to use with other agents.
