import { defineConfig } from 'drizzle-kit';

const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!postgresUrl) {
  throw new Error(
    'POSTGRES_URL (or DATABASE_URL) is not set. Pull env vars from Vercel with `vercel env pull .env.local`, or set POSTGRES_URL to a Neon / Postgres connection string.',
  );
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: postgresUrl,
  },
});
