# e2e/ — Playwright tests

## Setup (one-time)

```bash
npm install            # adds @playwright/test from devDeps
npx playwright install chromium
```

## First-time baseline capture

dcyfr-ai-web doesn't have a public production URL yet — capture against a
local dev server or a Vercel preview:

```bash
# Local dev (requires npm run dev running in another terminal)
BASE_URL=http://localhost:3000 npm run test:snapshots:update

# Or against a Vercel preview
BASE_URL=https://dcyfr-ai-web-<hash>.vercel.app npm run test:snapshots:update
```

Commit the resulting PNGs.

## Regular runs

```bash
npm run test:snapshots
```

Fails if diff > 5% (`maxDiffPixelRatio: 0.05`).

## Coverage

- **Routes:** `/` + `/login`
- **Viewports:** desktop `1440×900`, mobile `375×812`
- **Motion:** `prefers-reduced-motion: reduce` + `animations: 'disabled'`

## Related

- [Polish loop architecture](../../../../docs/dcyfr-workspace/polish-loop.md)
- [`nexus/scout-prompts/dcyfr-ai-web.md`](../../../../nexus/scout-prompts/dcyfr-ai-web.md)
- [Cascade resolution (Path A)](../../../../openspec/changes/dcyfr-ai-web-cascade-resolution/)
