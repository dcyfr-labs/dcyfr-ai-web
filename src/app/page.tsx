import Link from 'next/link';
import { DcyfrButton } from '@/components/ui/dcyfr-button';
import { DcyfrBadge } from '@/components/ui/dcyfr-badge';
import {
  DcyfrCard,
  DcyfrCardContent,
  DcyfrCardHeader,
  DcyfrCardTitle,
} from '@/components/ui/dcyfr-card';
import { AgentNetworkHero } from '@/components/hero/agent-network-hero';

export default function HomePage() {
  return (
    <div className="container px-4">
      {/* Hero Section — the 3D agent-network renders as a background layer.
          Above-fold on desktop (md+), below-fold on mobile (viewport height
          cap on the wrapper keeps it <= 70vh so the CTAs stay in reach). */}
      <section className="relative flex flex-col items-center justify-center space-y-6 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32">
        <AgentNetworkHero className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-[70vh] overflow-hidden opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] md:block" />
        <div className="relative flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <DcyfrBadge variant="secure" size="md" className="mb-2">
            <span
              className="size-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            Next.js 16 · React 19 · Drizzle · JWT
          </DcyfrBadge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Build full-stack apps{' '}
            <span className="text-primary">faster</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A production-ready Next.js template with authentication, database, and UI components.
            Start building immediately.
          </p>
          <div className="flex gap-4">
            <DcyfrButton asChild variant="brand" size="lg">
              <Link href="/dashboard">Get Started</Link>
            </DcyfrButton>
            <DcyfrButton asChild variant="ghostly" size="lg">
              <Link href="/blog">Read Blog</Link>
            </DcyfrButton>
          </div>
        </div>
      </section>

      {/* Mobile below-fold agent-network mount — desktop gets it above-fold
          as the hero bg (see section above). Cap height so the features grid
          stays in view. */}
      <section className="relative -mx-4 mb-8 aspect-square overflow-hidden md:hidden">
        <AgentNetworkHero className="pointer-events-none absolute inset-0 size-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]" />
      </section>

      {/* Features Section */}
      <section className="grid gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="App Router"
          description="Built on Next.js 16 App Router with Server Components and streaming."
        />
        <FeatureCard
          title="Authentication"
          description="JWT-based auth with protected routes, middleware, and role-based access."
        />
        <FeatureCard
          title="Database"
          description="Drizzle ORM with SQLite for development, ready for PostgreSQL in production."
        />
        <FeatureCard
          title="UI Components"
          description="@dcyfr-labs brand primitives + shadcn/ui + Tailwind v4 + next-themes."
        />
        <FeatureCard
          title="Type Safety"
          description="End-to-end TypeScript with Zod validation for runtime safety."
        />
        <FeatureCard
          title="Testing"
          description="Vitest + React Testing Library for unit tests, Playwright for E2E."
        />
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <DcyfrCard variant="default" padding="md" className="transition-all hover:shadow-md">
      <DcyfrCardHeader className="pb-2">
        <DcyfrCardTitle className="text-lg">{title}</DcyfrCardTitle>
      </DcyfrCardHeader>
      <DcyfrCardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </DcyfrCardContent>
    </DcyfrCard>
  );
}
