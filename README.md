# jaylinman.com

Jaylin Man's portfolio: a single-page site, plus the previous version of the site kept as an easter egg at `/v0`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.
`npm run build` and `npm run lint` must both pass before a deploy.

## How it is organized

The app has two root layouts, so the two sites never share CSS, fonts or scripts.
Moving between them is a full page load.

- `app/(site)/` is the current site.
  All copy lives in `app/(site)/_content.ts`; components in `_components/` only render it.
  Styling is `tokens.css` (Rosé Pine Dawn and Moon tokens, reset, base type) plus one CSS Module per component.
- `app/(legacy)/` is the old site, served under `/v0` with `noindex`.
  Its assets live in `public/v0/`.
  The way in is the hollow ring at the end of the Experience timeline.
- `app/global-not-found.tsx` is the shared 404 for both sites (it needs `experimental.globalNotFound` in `next.config.ts`).
- `app/api/contact/route.ts` sends the `/v0/contact` form to email.
  The current site has no form; it links to email directly.

Old top-level URLs (`/about`, `/resume`, `/cs-projects`, `/contact`, `/graphics`) redirect to sections of the current site; see `next.config.ts`.

## Environment

| Variable | Used by |
| --- | --- |
| `EMAIL_USER`, `EMAIL_PASS` | The `/v0/contact` form (a Gmail address and an app password). |
| `VERCEL_GIT_COMMIT_SHA` | Set by Vercel; shown as the build stamp in the footer (falls back to `dev`). |

Analytics is Vercel Web Analytics.
Turn it on under Analytics in the Vercel project; no key is needed.

## Updating content

- Experience, projects, leadership and the hero live in `app/(site)/_content.ts`.
  Metric chips are data: `{ diff: ['3 hours', '10 minutes'] }` or `{ stat: '400+ RSVPs' }`.
- Set `repoReady: false` on a project to show it without a GitHub link.
- The resume PDF is `public/Jaylin_Man_Resume.pdf`.
- After adding or replacing images in the old graphics portfolio, run `npm run v0:graphics:sizes` to refresh their dimensions.
