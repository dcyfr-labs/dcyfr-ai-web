# e2e/ — Playwright tests

## Setup (one-time)

```bash
npm install            # adds @playwright/test from devDeps
npx playwright install chromium
```

## First-time baseline capture

dcyfr-ai-web has a public Vercel preview at **https://dcyfr-ai-web.vercel.app/** — capture against it for production-parity baselines:

```bash
# Against the public preview (preferred for baseline-committing)
BASE_URL=https://dcyfr-ai-web.vercel.app npm run test:snapshots:update

# Or local dev (fast iteration, macOS-rendered; CI uses linux)
BASE_URL=http://localhost:3000 npm run test:snapshots:update
```

Commit the resulting PNGs. The `snapshotPathTemplate` override in
`playwright.config.ts` drops the `{platform}` suffix so darwin-captured
baselines match CI's linux-rendered diff within the 5% tolerance.

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
