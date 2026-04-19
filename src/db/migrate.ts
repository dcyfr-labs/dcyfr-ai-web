import { neon } from '@neondatabase/serverless';

/**
 * Migration runner for Neon Postgres.
 *
 * Executes the DDL inline (idempotent CREATE TABLE IF NOT EXISTS). For
 * production apps consider `drizzle-kit` migration files, but this stays
 * minimal to match the template's "fresh clone → working auth" contract.
 */

const MIGRATION_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

export async function migrate(url?: string): Promise<void> {
  const postgresUrl = url || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!postgresUrl) {
    throw new Error('POSTGRES_URL is required for migration');
  }
  const client = neon(postgresUrl);
  // Execute each statement separately — neon-http doesn't support multi-statement query
  const statements = MIGRATION_SQL.split(';')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const stmt of statements) {
    await client.query(stmt);
  }
}

// CLI entry point
if (process.argv[1] === import.meta.filename) {
  await migrate();
  console.log('✅ Migrations complete');
}
