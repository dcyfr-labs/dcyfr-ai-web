'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Site-level theme provider for dcyfr-ai-web.
 *
 * Wraps `next-themes` with `attribute="class"` so `.dark` toggles cleanly
 * alongside the site's permanent identity class (`theme-dcyfr-ai-web` set on
 * <html> in app/layout.tsx). Default scheme: dark (futuristic/neon identity).
 *
 * Phase 2 of openspec/changes/dcyfr-skeleton-sites-scaffolding —
 * unblocked by dcyfr-ai-web-cascade-resolution Path A retirement.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
