# Examples

This directory contains runnable examples for `@dcyfr/ai-web`.

## Files

- `api-client.ts` — Type-safe client wrapper for API routes.
- `custom-components.tsx` — Reusable component composition patterns.
- `database-operations.ts` — Drizzle ORM query and mutation patterns.

## Prerequisites

- Install dependencies: `npm install`
- Use project TypeScript config for `@/*` path aliases.

## Run examples

From package root:

- `npx tsx examples/api-client.ts`
- `npx tsx examples/database-operations.ts`

> `custom-components.tsx` is intended as component reference code and is typically consumed from the app/runtime environment.

## Type-check examples

- `npx tsc --noEmit`
