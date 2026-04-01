# Contributing to @dcyfr/ai-web

## Licensing & Contributions

By contributing to `@dcyfr/ai-web`, you agree that:

- Your contributions will be licensed under the project's MIT License
- You have the right to submit the contribution under this license
- You grant DCYFR Labs perpetual rights to use, modify, and distribute your contribution

### Trademark

Do not use "DCYFR" trademarks in ways that imply endorsement without permission. See [../TRADEMARK.md](../TRADEMARK.md) for usage guidelines.

**Questions?** Contact [licensing@dcyfr.ai](mailto:licensing@dcyfr.ai)

## Development Setup

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Code Standards

- TypeScript strict mode
- ESLint + Prettier formatting
- Server Components by default
- Zod validation for all API inputs
- Services layer for database access

## Testing

```bash
npm run test:run        # Run all tests
npm run test            # Watch mode
npm run test:coverage   # Coverage report
```

All changes must maintain 100% test pass rate.

## Pull Request Process

**Branch Naming Convention:**
```bash
# Format: <type>/DCYFR-<NUMBER>-<description>
git checkout -b feat/DCYFR-123-add-new-feature
git checkout -b fix/DCYFR-456-resolve-bug
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

**PR Workflow:**
1. Create feature branch from `main` following naming convention above
2. Implement changes with tests
3. Run `npm run typecheck && npm run test:run`
4. Submit PR with title: `[DCYFR-<NUMBER>] Brief description`
5. Include `DCYFR-<NUMBER>` reference in commit messages
