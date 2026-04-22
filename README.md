# RailTrack — Indian Railways PWA
## Comprehensive Documentation

---

## 1. Project Overview

**RailTrack** is a Progressive Web App (PWA) built for Indian Railways users. It provides:
- Real-time PNR status checking with offline caching
- Storage of up to 5 important train details
- Tatkal booking alarms with separate timings for AC (10:00 AM) and Sleeper (11:00 AM)
- Live countdown clock to Tatkal window
- Browser push notifications

---

## 2. File Structure

```
indian-railways-pwa/
├── index.html       # Main app shell (single-file PWA)
├── sw.js            # Service Worker (offline, caching, push)
├── manifest.json    # Web App Manifest (install metadata)
└── README.md        # This documentation
```

---

## 3. Architecture

### 3.1 App Architecture
```
┌─────────────────────────────────────────────────────┐
│                   index.html                        │
│  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐  │
│  │  PNR Tab │ │Train Tab │ │Alarm   │ │About    │  │
│  │          │ │          │ │Tab     │ │Tab      │  │
│  └────┬─────┘ └────┬─────┘ └───┬────┘ └─────────┘  │
│       │            │           │                    │
│  ┌────▼─────────────▼───────────▼──────────────┐   │
│  │           JavaScript State Layer             │   │
│  │  trains[] · alarms[] · cachedPNR             │   │
│  └───────────────────┬──────────────────────────┘   │
│                      │                              │
│  ┌───────────────────▼──────────────────────────┐   │
│  │           localStorage (Persistence)          │   │
│  │  rt_trains · rt_alarms · rt_pnr              │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────────────┐
│   sw.js         │      │   External API           │
│  Service Worker │      │  (RapidAPI IRCTC /       │
│  - Cache shell  │◄────►│   RailwayAPI.com)        │
│  - Offline mode │      │                          │
│  - Push notify  │      └─────────────────────────┘
└─────────────────┘
```

### 3.2 Caching Strategy
| Resource Type | Strategy |
|---|---|
| App shell (HTML, CSS, JS) | Cache-first with background update |
| API responses (PNR data) | Network-first with localStorage fallback |
| Fonts (Google Fonts) | Cache-first |
| API calls when offline | localStorage cache served |

---

## 4. Feature Documentation

### 4.1 PNR Status

**Flow:**
1. User enters 10-digit PNR → `fetchPNR()` is called
2. If offline → `loadCachedPNR()` is called automatically
3. If online → fetch from API → render result → cache in `localStorage`
4. Cached result is always available offline

**Offline Support:**
```javascript
localStorage.setItem('rt_pnr', JSON.stringify({ ...pnrData, cachedAt: new Date().toISOString() }));
```

**Switching to Live API:**
Replace the mock block in `fetchPNR()` with:
```javascript
const res = await fetch(`https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnr}`, {
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
  }
});
const json = await res.json();
```

**Recommended APIs:**
- [RailwayAPI.com](https://railwayapi.com) — Free tier, 1000 req/day
- [RapidAPI IRCTC](https://rapidapi.com/IRCTCAPI/api/irctc1) — Paid, reliable
- [Where Is My Train API](https://rapidapi.com/search/indian%20railways)

---

### 4.2 Train Details

- Stores up to **5 trains** in `localStorage` under key `rt_trains`
- Each train record:
```json
{
  "id": 1713600000000,
  "num": "12301",
  "name": "Howrah Rajdhani",
  "from": "HWH",
  "dep": "19:55",
  "to": "NDLS",
  "arr": "09:55",
  "cls": "3A",
  "days": "Mon, Thu"
}
```
- Delete a train also removes its associated alarms

---

### 4.3 Tatkal Alarm System

**Tatkal Rules Implemented:**
| Class | Booking Opens | Day |
|---|---|---|
| AC (1A, 2A, 3A, CC) | 10:00 AM | D-1 of journey |
| Sleeper (SL) | 11:00 AM | D-1 of journey |

**Alarm Trigger Logic:**
```javascript
// Alarm fires when: (tatkal_time - advance_minutes) <= now < (tatkal_time - advance_minutes + 60 seconds)
const tatkalH = cls === 'AC' ? 10 : 11;
jDate.setDate(jDate.getDate() - 1);  // D-1
jDate.setHours(tatkalH, -advanceMinutes, 0, 0);
```

**On Trigger:**
1. Toast notification in-app
2. Web Notification API (if permission granted)
3. Audio beep sequence via Web Audio API

**Alarm record structure:**
```json
{
  "id": 1713600000000,
  "trainId": 12301,
  "trainName": "Howrah Rajdhani",
  "trainNum": "12301",
  "date": "2026-05-10",
  "cls": "BOTH",
  "adv": 15,
  "active": true
}
```

---

### 4.4 Offline Mode

**Service Worker strategies:**
```
INSTALL  → Pre-cache: index.html, sw.js, manifest.json, fonts
ACTIVATE → Delete old caches
FETCH    → Cache-first (static) | Network-first (API)
PUSH     → Show notification even when app is closed
SYNC     → Background re-fetch PNR when connectivity restored
```

**Offline indicators:**
- Red dot in header pill
- Orange banner in PNR panel
- Cached PNR auto-loaded

---

### 4.5 Notifications

**Permission flow:**
```javascript
Notification.requestPermission() → 'granted' | 'denied' | 'default'
```

**Notification payload (push):**
```json
{
  "title": "Tatkal AC Opening Soon!",
  "body": "Book 12301 · Howrah Rajdhani\nOpens at 10:00 AM",
  "vibrate": [200, 100, 200, 100, 400],
  "actions": [
    { "action": "open", "title": "Open App" },
    { "action": "dismiss", "title": "Dismiss" }
  ]
}
```

---

## 5. Installation Guide

### Running Locally
```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node.js
npx serve .

# Option 3: VS Code Live Server extension
```
Open `http://localhost:8080` in Chrome/Firefox.

### Installing as PWA
1. Open in Chrome on Android → tap ⋮ menu → "Add to Home Screen"
2. On iOS Safari → tap Share → "Add to Home Screen"
3. On desktop Chrome → click install icon in address bar

---

## 6. Test Cases

### TC-01: PNR Validation
| Input | Expected |
|---|---|
| `4201234567` (10 digits) | API call triggered |
| `12345` (< 10 digits) | Error toast shown |
| `abcdefghij` (non-numeric) | Error toast shown |
| Empty string | Error toast shown |

### TC-02: Offline PNR
| Scenario | Expected |
|---|---|
| Go offline, open app | Red offline banner shown |
| Click "Check Status" while offline | Auto-loads cached PNR |
| No cached PNR + offline | "No cached PNR found" warning |

### TC-03: Train Storage
| Action | Expected |
|---|---|
| Add 5 trains | All saved, shown in cards |
| Add 6th train | "Max 5 trains" error |
| Delete train | Card removed, alarm for that train removed |
| Refresh page | Trains persist from localStorage |

### TC-04: Alarm
| Action | Expected |
|---|---|
| Add alarm without train selected | Validation error |
| Add alarm without date | Validation error |
| Toggle alarm off | Card loses armed styling |
| Alarm fires | Toast + notification + audio beep |
| AC class | Reminder time = 10:00 AM - adv minutes (D-1) |
| SL class | Reminder time = 11:00 AM - adv minutes (D-1) |

### TC-05: Notification Permission
| State | Expected |
|---|---|
| Permission `default` | Request prompt shown on alarm set |
| Permission `granted` | Notifications fire on alarm trigger |
| Permission `denied` | Toast warns user |

---

## 7. Performance Optimizations

1. **Single-file architecture** — no render-blocking JS bundles
2. **CSS-only animations** — no animation library overhead
3. **localStorage** — synchronous, instant read/write for small datasets
4. **Service Worker pre-caching** — app shell loads instantly after first visit
5. **Lazy data rendering** — train/alarm lists render only on tab switch
6. **Debounced clock** — `setInterval` at 1s for clock, not RAF

**Lighthouse targets:**
| Metric | Target |
|---|---|
| Performance | > 90 |
| Accessibility | > 85 |
| Best Practices | > 90 |
| PWA | ✓ installable |

---

## 8. Security Considerations

- API keys must **never** be hardcoded in client-side JS; use a backend proxy
- `localStorage` data is **not encrypted** — avoid storing sensitive PII
- CSP headers should be added via server config for production
- Notification permissions use standard browser API — no custom bypass
- HTTPS is **required** for Service Workers and Push Notifications

---

## 9. Deployment

```bash
# Deploy to Netlify (drag & drop /indian-railways-pwa folder)
# Deploy to Vercel
vercel deploy

# Deploy to Firebase Hosting
firebase init hosting
firebase deploy

# Required: HTTPS endpoint (Service Worker requires secure context)
```

---

## 10. Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full (PWA install, notifications, SW) |
| Firefox 88+ | ✅ Full |
| Safari 15+ iOS | ✅ Partial (no push notifications on older iOS) |
| Edge 90+ | ✅ Full |
| Samsung Internet | ✅ Full |

---

## 11. Known Limitations & Future Enhancements

| Current Limitation | Future Enhancement |
|---|---|
| Mock PNR API | Integrate live IRCTC/RapidAPI key via backend proxy |
| No user accounts | Firebase Auth for cloud sync |
| localStorage only | IndexedDB for larger datasets |
| Manual alarm check | Background Sync API for reliable offline triggering |
| No train search | Integrate train search from station code |

---

*RailTrack v1.0 — Built for Indian Railways Intern Assignment*
