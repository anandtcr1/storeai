# SmartStore AI — Wireframe

Interactive wireframe for the SmartStore AI retail-vision analytics platform,
built from the Technical Specification v1.0 and the Sales Pitch deck.

## Running

```bash
npm install
npm start          # opens http://localhost:3000
```

Stack: **React 18 · React-Bootstrap (Bootstrap 5) · React Router v6 · Recharts · Vite**

## What's included

| Route | Component | Purpose |
|---|---|---|
| `/live-ops` | `LiveOps.jsx` | Default landing — KPIs, floor heat map, active alerts |
| `/analytics` | `Analytics.jsx` | Conversion funnel, footfall trends, journeys |
| `/merchandising` | `Merchandising.jsx` | Zone performance table, out-of-stock log |
| `/workforce` | `Workforce.jsx` | Traffic forecast vs. staffing, recommendations |
| `/loss-prevention` | `LossPrevention.jsx` | Incident log with severity filter and video drill-down |
| `/reports` | `Reports.jsx` | Recent reports, custom builder, scheduled exports |
| `/settings` | `Settings.jsx` | Cameras, zones, POS, users, privacy, plan, audit |

## How the wireframe maps to the source documents

### Technical Specification v1.0

- **§10 Application shell** → `Header.jsx` carries store selector, date range,
  search, notifications, and avatar; `Sidebar.jsx` exposes the seven menu groups
  with role-style separators (Operations · Security · Insights).
- **§10 Live operations** → KPI strip with the four sales-deck numbers
  (87 · 1,243 · 78% · 4.2m), 5-column heat-map grid, alerts column with
  per-alert action buttons.
- **§10 Conversion funnel** → CSS-grid funnel reproducing the verbatim
  numbers from page 24 (8,742 → 5,332) plus drop-off and strongest-stage
  callouts.
- **§10 Zone performance / Out-of-stock log** → both screens consolidated
  on `/merchandising`. Row-click opens a drill-down modal as the spec
  describes.
- **§10 Staffing recommendations** → composed Recharts bar+line chart
  matching the spec wireframe; recommendation cards with apply-to-schedule.
- **§10 Incident log** → severity-filtered table; clicking a row opens a
  modal with a placeholder for the 30-day retained video clip.
- **§10 Reports** → daily/weekly/custom recent list, builder form, and
  scheduled exports panel.
- **§10 Settings** → sub-navigation pills covering cameras, zones, POS
  (Tech Spec §9), users, privacy (§14), plan, and audit log.
- **§14 Privacy & PDPL** → privacy toggles, retention slider, audit-log
  surface; footer notes UAE region hosting and PDPL compliance.
- **§16 Recommendations** → mobile-first via Bootstrap responsive grid
  and an Offcanvas sidebar; multi-tenant store selector in header;
  every alert ships with an action button.

### Sales Pitch

- **Slide 5 hero KPIs** → `LiveOps` KPI strip uses the exact numbers shown
  to prospects (87 in-store, 78% conversion, 4.2m wait, 3 alerts).
- **Slide 4 six pillars** → menu groups + page composition reflect the
  six advertised capabilities (live traffic, funnel, queues, stockouts,
  staffing, loss prevention).
- **Slide 10 pricing tiers** → `Settings → Plan` renders Essential /
  Professional / Enterprise tier cards; the "current" plan gets an
  outlined highlight.
- **Slide 7 "Privacy by design"** → privacy controls visible and toggleable
  in Settings rather than hidden in admin docs.

## Responsive design

- **Phone (< 576px)**: sidebar collapses to off-canvas drawer (hamburger
  in header), KPI cards stack 1-up, tables hide secondary columns
  (`d-none d-sm-table-cell`), heat map drops to 2-col grid.
- **Tablet (576–991px)**: KPIs go 2-up, sidebar still off-canvas, charts
  full-width.
- **Desktop (≥ 992px)**: sidebar fixed column, KPIs 4-up, heat map 5-col,
  alerts column splits 8/4 next to heat map.

## Visual hierarchy decisions

- **Primary actions** use solid `variant="primary"` (Apply, Notify,
  Generate, Live mode) — one per area at most.
- **Secondary actions** use `outline-secondary` or `link` — Export,
  Dismiss, Configure.
- **Destructive / high-priority** uses red badges and danger borders for
  high-severity stockouts and incidents.
- **Wireframe placeholders** (hatched dashed boxes) intentionally signal
  "real chart goes here" — Recharts is used only where a chart is core
  to the spec (funnel trend line, staffing forecast).

## File layout

```
src/
├── main.jsx                  Bootstrap + Router entry
├── App.jsx                   Layout shell + routes
├── styles.css                Minimal custom CSS
├── components/
│   ├── Header.jsx            Sticky top bar
│   ├── Sidebar.jsx           Desktop column / mobile drawer
│   ├── Footer.jsx            Compliance footer
│   └── Common.jsx            KpiCard, PageHeader, Placeholder
└── pages/
    ├── LiveOps.jsx
    ├── Analytics.jsx
    ├── Merchandising.jsx
    ├── Workforce.jsx
    ├── LossPrevention.jsx
    ├── Reports.jsx
    └── Settings.jsx
```
