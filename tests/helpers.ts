import type { DbInstance } from '@/db/connection';

/**
 * Test DB helpers — temporarily stubbed after the Neon migration
 * (openspec/changes/dcyfr-ai-web-vercel-neon-swap).
 *
 * The old implementation used in-memory `better-sqlite3` for fast, isolated
 * service tests. After moving to Neon Postgres over HTTP, an equivalent
 * drop-in doesn't exist — options:
 *
 *   1. PGlite (pg-compatible WASM, in-memory) — moderate rewrite, adds a dep
 *   2. Shared Neon test DB — introduces network-IO in the unit-test loop
 *   3. Drizzle query mocking — unit-style with no DB at all
 *
 * Follow-up under `dcyfr-ai-web-test-db-strategy` (TBD). Until then, the
 * two service tests that depend on these helpers are marked `describe.skip`.
 */

export function getTestDb(): DbInstance {
  throw new Error(
    'Test DB helpers are stubbed pending the post-Neon test strategy. ' +
    'See tests/helpers.ts for the options under review. The affected ' +
    'service tests should be marked `describe.skip` for the interim.',
  );
}

export function resetTestDb(_instance: DbInstance): void {
  throw new Error('Test DB helpers stubbed (see getTestDb).');
}
