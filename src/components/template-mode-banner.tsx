/**
 * TemplateModeBanner — displays on auth surfaces that aren't wired to a
 * persistent DB. This repo ships as a Next.js starter template; the Vercel
 * preview at https://dcyfr-ai-web.vercel.app/ is a read-only showcase of
 * the UI. Auth/register/posts endpoints 500 because `better-sqlite3` +
 * `./data/dev.db` doesn't persist across Vercel's serverless invocations
 * and migrations don't run on the serverless bundle.
 *
 * Clone + local-dev gets the full end-to-end working experience. A future
 * follow-up (see openspec/changes/dcyfr-ai-web-network-db-swap) migrates
 * the DB driver to a network-native option (Turso / Neon) so the live
 * preview itself can demo real auth.
 */
export function TemplateModeBanner() {
  return (
    <div
      role="note"
      className="mb-6 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning-foreground"
    >
      <p className="font-semibold text-warning">⚠ Template preview mode</p>
      <p className="mt-1 text-foreground/80">
        This is a public showcase of the template UI. Authentication, registration,
        and data endpoints return <code className="font-mono text-xs">500</code>{' '}
        on this deploy because the template uses file-based SQLite which doesn't
        persist on Vercel serverless. For a working end-to-end experience, clone
        the repo and run locally:
      </p>
      <pre className="mt-2 overflow-x-auto rounded bg-card/50 px-3 py-2 font-mono text-xs text-foreground">
{`git clone https://github.com/dcyfr-labs/dcyfr-ai-web
cd dcyfr-ai-web && npm install
npm run db:migrate && npm run dev`}
      </pre>
    </div>
  );
}
