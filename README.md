# @dcyfr/ai-web

<!-- README-META
  tlp_clearance: GREEN
  status: deprecated
  name: dcyfr-ai-web
  description: Production-ready full-stack Next.js web application template with App Router, Drizzle ORM, JWT auth, and Tailwind CSS
  last_validated: 2026-07-11
-->

> **⚠️ PACKAGE DEPRECATED ON NPM (February 27, 2026)**  
> This package was published to npm but has been **deprecated**. It is a starter template, not a library — it survives only as a GitHub starter template.  
> **Use this repo as:**
>
> - 📋 GitHub Template: Click "Use this template" above
> - 📦 Direct clone: `git clone https://github.com/dcyfr-labs/dcyfr-ai-web`
> - 🚀 Degit: `npx degit dcyfr-labs/dcyfr-ai-web my-app`
>
> This package is now marked `"private": true` to prevent future publication.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/dcyfr-labs/dcyfr-ai-web)

[![CI](https://github.com/dcyfr-labs/dcyfr-ai-web/actions/workflows/ci.yml/badge.svg)](https://github.com/dcyfr-labs/dcyfr-ai-web/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS%204-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Template](https://img.shields.io/badge/Type-Template-blue?style=flat-square&logo=github)](https://github.com/dcyfr-labs/dcyfr-ai-web)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**Full-stack Next.js web application template** with App Router, Drizzle ORM on Neon Postgres, JWT authentication, and Tailwind CSS.

Perfect for building modern web applications with type-safe APIs, server-side rendering, and production-grade architecture patterns.

## About DCYFR

`@dcyfr/ai-web` is maintained by **DCYFR Labs** as part of the DCYFR starter template portfolio.

- **DCYFR** is a registered trademark of DCYFR Labs.
- Primary domain: [www.dcyfr.ai](https://www.dcyfr.ai)
- Licensing details: [LICENSE](./LICENSE)

---

## ⚡ Quick Start

The template runs on **Neon Postgres** (Postgres over HTTP) — you need a `POSTGRES_URL` before the dev server can serve database-backed routes.

```bash
# Clone template
npx degit dcyfr-labs/dcyfr-ai-web my-web-app
cd my-web-app

# Install
npm install

# Configure database (pick one):
#   a) Vercel project with the Neon integration:
vercel env pull .env.local
#   b) Any Postgres connection string:
cp .env.example .env.local   # then set POSTGRES_URL

# Migrate + seed, then start
npm run db:migrate && npm run db:seed
npm run dev
# ✅ Full-stack app at http://localhost:3000
```

---

## 🧭 Related Packages

| Package                                                          | Purpose                | Type        |
| ---------------------------------------------------------------- | ---------------------- | ----------- |
| [@dcyfr/ai](https://github.com/dcyfr-labs/dcyfr-ai)               | Core AI framework      | npm package |
| [@dcyfr/ai-react](https://github.com/dcyfr-labs/dcyfr-ai-react)   | React SPA template     | Template    |
| [@dcyfr/ai-api](https://github.com/dcyfr-labs/dcyfr-ai-api)       | REST API template      | Template    |
| [dcyfr-labs](https://github.com/dcyfr-labs/dcyfr-labs)            | Production Next.js app | Application |

---

## Features

✅ **Modern Stack** — Next.js 16 App Router with TypeScript 6  
✅ **Database** — Drizzle ORM on Neon Postgres (serverless HTTP driver)  
✅ **Authentication** — JWT auth with cookie-based route protection  
✅ **Validation** — Zod schemas for all API inputs  
✅ **UI Components** — Shadcn/ui-compatible component library + DCYFR chrome  
✅ **Testing** — 73 unit/component tests (Vitest + RTL) + Playwright visual regression  
✅ **Type-Safe** — End-to-end type safety with TypeScript + Zod  
✅ **Production-Ready** — Health checks, error handling, proxy-based route protection

## Tech Stack

| Category      | Technology                  | Version |
| ------------- | --------------------------- | ------- |
| Framework     | Next.js (App Router)        | 16.x    |
| Language      | TypeScript                  | 6.0     |
| Styling       | Tailwind CSS                | 4.x     |
| UI Components | Shadcn/ui pattern           | -       |
| Database      | Drizzle ORM + Neon Postgres | 0.45    |
| DB Driver     | @neondatabase/serverless    | 1.x     |
| Auth          | JWT (jsonwebtoken)          | 9.x     |
| Passwords     | bcryptjs                    | 3.x     |
| Validation    | Zod                         | 4.x     |
| State         | Zustand                     | 5.x     |
| Testing       | Vitest + RTL                | 4.x     |
| E2E / Visual  | Playwright                  | 1.x     |

## Database

`src/db/connection.ts` is **Neon-Postgres-only** (`drizzle-orm/neon-http` over `@neondatabase/serverless`). The previous `better-sqlite3` + `./data/dev.db` path was dropped when migrating to a network DB — SQLite file semantics don't survive Vercel's serverless runtime.

- **Connection:** resolved from `POSTGRES_URL`, falling back to `DATABASE_URL` (Vercel's Neon integration injects both on Preview + Production).
- **Local dev:** `vercel env pull .env.local`, or point `POSTGRES_URL` at any Postgres instance.
- **Lazy connection:** importing `src/db` does not require env vars — only actual query execution does, so typecheck/lint/tests run without a live database.
- **Migrations:** `npm run db:migrate` runs `src/db/migrate.ts` (idempotent inline DDL). `npm run db:seed` migrates first, then seeds sample users/posts. `drizzle-kit` is configured (`drizzle.config.ts`, `dialect: postgresql`) for `db:generate` and `db:studio`.

### First Steps After Installation

1. **Create your first user:**
   - Navigate to [http://localhost:3000/register](http://localhost:3000/register)
   - Register with email/password
   - JWT token stored as a cookie

2. **Access protected dashboard:**
   - Login at [http://localhost:3000/login](http://localhost:3000/login)
   - Redirects to `/dashboard` when authenticated

3. **Create blog posts:**
   - Use `/dashboard` to create new posts
   - Posts appear at `/blog` when published

## Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with chrome (nav + footer)
│   ├── page.tsx           # Home page (hero + features)
│   ├── not-found.tsx      # 404 page
│   ├── login/page.tsx     # Login form (client component)
│   ├── register/page.tsx  # Registration form (client component)
│   ├── blog/              # Blog listing + [slug] detail
│   ├── dashboard/         # Protected dashboard with stats
│   └── api/
│       ├── auth/          # POST /register, POST /login
│       ├── posts/         # GET/POST /posts, GET/PATCH/DELETE /posts/[id]
│       └── health/        # GET /health
├── components/
│   ├── ui/                # Button, Input, Card, Badge, Spinner, Sheet,
│   │                      # DropdownMenu, Separator + dcyfr-* variants
│   ├── chrome/            # SiteNav, SiteFooter, PageShell, ThemeSwitcher
│   ├── hero/              # Agent-network hero (react-three-fiber scene)
│   └── theme-provider.tsx # next-themes provider
├── db/                    # Drizzle schema, Neon connection, migrate, seed
├── hooks/                 # useDebounce, useLocalStorage, useMediaQuery
├── lib/                   # Auth, errors, utils, schemas
├── services/              # UserService, PostService
├── stores/                # Zustand stores (auth, theme)
└── proxy.ts               # Route protection (Next 16 proxy, formerly middleware)

e2e/                       # Playwright visual-regression snapshots
tests/                     # Vitest unit/component tests
```

## Pages

| Route          | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| `/`            | Server | Landing page with hero and features |
| `/login`       | Client | Login form with JWT auth            |
| `/register`    | Client | Registration form                   |
| `/blog`        | Server | Published blog posts list           |
| `/blog/[slug]` | Server | Individual blog post                |
| `/dashboard`   | Server | Protected user dashboard            |

## API Routes

| Method | Endpoint             | Auth   | Description              |
| ------ | -------------------- | ------ | ------------------------ |
| POST   | `/api/auth/register` | -      | Create account + get JWT |
| POST   | `/api/auth/login`    | -      | Authenticate + get JWT   |
| GET    | `/api/posts`         | -      | List published posts     |
| POST   | `/api/posts`         | Bearer | Create new post          |
| GET    | `/api/posts/[id]`    | -      | Get post by ID           |
| PATCH  | `/api/posts/[id]`    | Bearer | Update own post          |
| DELETE | `/api/posts/[id]`    | Bearer | Delete own post          |
| GET    | `/api/health`        | -      | Health check             |

## Authentication

JWT-based auth with cookie storage for SSR route protection:

```typescript
// Login/register store the token as a cookie (client-side)
document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

// src/proxy.ts checks the cookie for /dashboard routes
// API routes check Authorization: Bearer <token> header
```

Passwords are hashed with **bcryptjs** (10 rounds) in `src/lib/auth.ts`.

## UI Components

Shadcn/ui-compatible components with CSS variables for theming:

- **Button** — 6 variants (default, destructive, outline, secondary, ghost, link)
- **Input** — With error state display
- **Card** — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Badge**, **Spinner**, **Sheet**, **DropdownMenu**, **Separator**
- **dcyfr-\*** — DCYFR-branded Button/Badge/Card/Skeleton variants
- **Chrome** — SiteNav, SiteFooter, PageShell, ThemeSwitcher (`src/components/chrome/`)

## Environment Variables

These are the variables the code actually reads (see `.env.example`):

```env
# Database — required for db-backed routes, migrations, and seeding.
# Vercel's Neon integration injects POSTGRES_URL + DATABASE_URL automatically;
# locally, run `vercel env pull .env.local` or set your own Postgres URL.
POSTGRES_URL=postgresql://user:password@host/database?sslmode=require
# DATABASE_URL is accepted as a fallback alias for POSTGRES_URL.

# Authentication (defaults exist for dev; always set JWT_SECRET in production)
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

For Playwright snapshot runs, `BASE_URL` selects the target (defaults to `http://localhost:3000`; see [e2e/README.md](e2e/README.md)).

## Testing

```bash
npm run test:run        # Run all unit/component tests (73 tests)
npm run test            # Watch mode
npm run test:coverage   # With coverage report

npm run test:e2e        # Playwright tests
npm run test:snapshots  # Visual-regression snapshots (chromium)
```

### Test Coverage

| Suite                    | Tests | Description                       |
| ------------------------ | ----- | --------------------------------- |
| lib/errors               | 7     | Error class hierarchy             |
| lib/auth                 | 5     | Password hashing + JWT            |
| lib/utils                | 9     | cn, slugify, formatDate, truncate |
| lib/schemas              | 14    | Zod validation schemas            |
| services/user            | 9     | CRUD + duplicate detection        |
| services/post            | 10    | CRUD + owner enforcement          |
| components/button        | 6     | Variants, sizes, ref, disabled    |
| components/input         | 5     | Rendering, error state, ref       |
| components/card          | 2     | Composition pattern               |
| components/badge+spinner | 6     | Variants, sizes, accessibility    |

### Visual Regression

Playwright snapshot tests live in `e2e/` and run against the public preview at <https://dcyfr-ai-web.vercel.app/> or a local dev server. Baseline capture and tolerance notes: [e2e/README.md](e2e/README.md). CI runs them via `.github/workflows/visual-regression.yml`.

## Patterns

### Server vs Client Components

- **Default to Server Components** (no `'use client'` directive) for better performance
- **Client Components only when needed:** Forms, event handlers, browser APIs, React hooks
- `src/proxy.ts` handles authentication for protected Server Components

### Database Access

- **Service layer pattern** — `UserService`, `PostService` isolate DB logic
- **Drizzle ORM** for type-safe queries over the Neon serverless driver
- **Migrations** via `npm run db:migrate` (inline DDL) + Drizzle Kit (`npm run db:generate`, `npm run db:studio`)

### Zod Validation

- All API inputs validated with Zod schemas in `src/lib/schemas.ts`
- Type-safe with inferred types: `RegisterInput`, `CreatePostInput`, etc.
- Validation errors return structured error messages for client display

## Documentation

Comprehensive guides available in `docs/` directory:

- **[DATABASE.md](docs/DATABASE.md)** — Drizzle ORM patterns and migrations
- **[AUTHENTICATION.md](docs/AUTHENTICATION.md)** — JWT implementation, route protection, security
- **[API_ROUTES.md](docs/API_ROUTES.md)** — Route handlers, validation, error handling
- **[API.md](docs/API.md)** — API reference
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** — Deployment guides

## Examples

See [`examples/README.md`](examples/README.md) for a quick index, prerequisites, and run/type-check commands.

Executable examples in `examples/` directory:

- **[api-client.ts](examples/api-client.ts)** — Type-safe API client with authentication
- **[custom-components.tsx](examples/custom-components.tsx)** — Build reusable UI components
- **[database-operations.ts](examples/database-operations.ts)** — Advanced Drizzle ORM patterns

### Using Examples

```typescript
// Import API client example
import { APIClient } from './examples/api-client';

const api = new APIClient();

// Register user
const { user } = await api.auth.register({
  email: 'john@example.com',
  name: 'John Doe',
  password: 'SecurePassword123!',
});

// Create post (requires authentication)
const post = await api.posts.create({
  title: 'My First Post',
  content: 'Content goes here...',
  published: true,
});
```

## Deployment

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add the Neon (Postgres) integration to the project —
# it injects POSTGRES_URL/DATABASE_URL automatically.
# Set JWT_SECRET in the Vercel dashboard.
```

### Production Environment Variables

```env
NODE_ENV=production
POSTGRES_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=min-32-char-secure-random-string
JWT_EXPIRES_IN=7d
```

## Security Best Practices

✅ **Password hashing with bcryptjs** (10 rounds)  
✅ **Zod validation** for all API inputs  
✅ **Proxy-based route protection** for `/dashboard`  
✅ **Rate limiting** recommended for auth endpoints (not included)

See [AUTHENTICATION.md](docs/AUTHENTICATION.md) for the complete security guide.

## Performance

⚡ **Server Components by default** — Reduced JavaScript bundle size  
⚡ **Drizzle ORM** — Minimal runtime overhead, type-safe queries  
⚡ **Automatic code splitting** with Next.js App Router  
⚡ **Neon serverless driver** — Postgres over HTTP, suited to serverless runtimes

## Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Serve production build
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix linting issues
npm run format           # Prettier write
npm run typecheck        # TypeScript check

# Database
npm run db:generate      # Generate migrations (drizzle-kit)
npm run db:migrate       # Run migrations (src/db/migrate.ts)
npm run db:seed          # Migrate + seed sample data
npm run db:studio        # Open Drizzle Studio

# Testing
npm run test             # Vitest watch mode
npm run test:run         # Run all tests
npm run test:coverage    # With coverage report
npm run test:e2e         # Playwright tests
npm run test:e2e:ui      # Playwright UI mode
npm run test:snapshots   # Visual-regression snapshots
npm run test:snapshots:update  # Refresh snapshot baselines

# Examples
npm run examples:test    # Type-check examples
```

## Troubleshooting

### Database Connection Issues

```
Error: POSTGRES_URL (or DATABASE_URL) is not set.
```

**Solution:** Pull env vars from Vercel with `vercel env pull .env.local`, or set `POSTGRES_URL` to a Neon / Postgres connection string.

### JWT Verification Fails

```
Error: jwt malformed
```

**Solution:** Ensure `JWT_SECRET` environment variable is set correctly (and matches the secret used to sign the token).

### Module Not Found

```
Error: Cannot find module '@/lib/auth'
```

**Solution:** Check `tsconfig.json` paths configuration, run `npm run build` to regenerate types.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Ensure all tests pass (`npm run test:run`) and code is linted (`npm run lint`).

## Roadmap

- [ ] OAuth providers (Google, GitHub)
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Admin dashboard with RBAC
- [ ] Image upload with S3 integration
- [ ] Full-text search with PostgreSQL
- [ ] WebSocket support for real-time features
- [ ] API rate limiting middleware

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Neon Documentation](https://neon.tech/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)

## License

MIT © 2026 DCYFR

---

**Need help?** Open an issue or check the [documentation guides](docs/).
