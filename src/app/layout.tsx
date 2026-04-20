import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { PageShell, SiteNav, SiteFooter } from '@/components/chrome';
import { Button } from '@/components/ui';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DCYFR Web Template',
    template: '%s | DCYFR Web',
  },
  description: 'Production-ready full-stack Next.js web application template',
};

const DcyfrAiWebLogo = (
  <span className="text-lg font-bold tracking-tight">DCYFR Web</span>
);

const NAV_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard', label: 'Dashboard' },
];

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/login', label: 'Sign In' },
      { href: '/register', label: 'Get Started' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: 'https://nextjs.org', label: 'Next.js', external: true },
      { href: 'https://www.dcyfr.ai', label: 'DCYFR', external: true },
    ],
  },
];

/**
 * Nav-right CTA pair — rendered via the chrome's `cta` single-slot by
 * composing two buttons into a shared fragment. SiteNav exposes one CTA
 * slot; for two CTAs we wrap the primary and keep "Sign In" inline.
 *
 * Kept inline here rather than extending chrome, since this dual-CTA
 * pattern is specific to pre-auth sites.
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="theme-dcyfr-ai-web"
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageShell
            nav={
              <SiteNav
                logo={DcyfrAiWebLogo}
                links={NAV_LINKS}
                cta={{ href: '/register', label: 'Get Started' }}
              />
            }
            footer={
              <SiteFooter
                brand={{
                  name: 'DCYFR Web',
                  tagline: 'Production-ready full-stack Next.js template.',
                }}
                columns={FOOTER_COLUMNS}
              />
            }
            padding="none"
            maxWidth="full"
          >
            {children}
          </PageShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
