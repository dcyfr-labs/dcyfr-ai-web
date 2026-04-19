import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Database connection for dcyfr-ai-web.
 *
 * Uses Neon (Postgres over HTTP) via Vercel's Storage integration.
 * Env vars are auto-injected on Preview + Production by Vercel:
 *   - POSTGRES_URL          (pooled; default for app runtime)
 *   - POSTGRES_URL_NON_POOLING (for migrations / long connections)
 *   - DATABASE_URL          (alias of POSTGRES_URL on this deploy)
 *
 * For local dev without Neon credentials, pull the preview env vars:
 *   vercel env pull .env.local
 * or run against a local Postgres instance by setting POSTGRES_URL yourself.
 *
 * The previous `better-sqlite3` + `./data/dev.db` path was dropped when
 * migrating to a network DB — SQLite file semantics don't survive Vercel's
 * serverless runtime. See
 * openspec/changes/dcyfr-ai-web-vercel-neon-swap for the migration story.
 */

export type AppDb = NeonHttpDatabase<typeof schema>;

export interface DbInstance {
  orm: AppDb;
  client: NeonQueryFunction<false, false>;
}

function resolveUrl(url?: string): string {
  const resolved = url || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!resolved) {
    throw new Error(
      'POSTGRES_URL (or DATABASE_URL) is not set. Pull env vars from Vercel with `vercel env pull .env.local`, or set POSTGRES_URL to a Neon / Postgres connection string.',
    );
  }
  return resolved;
}

export function createDb(url?: string): DbInstance {
  const client = neon(resolveUrl(url));
  const orm = drizzle(client, { schema });
  return { orm, client };
}

const defaultInstance = createDb();
export const db: AppDb = defaultInstance.orm;
export const neonClient: NeonQueryFunction<false, false> = defaultInstance.client;
