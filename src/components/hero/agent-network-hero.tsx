'use client';

/**
 * AgentNetworkHero — the mountable hero background visual.
 *
 * Responsibilities:
 * 1. Dynamic-import the heavy R3F scene (ssr: false) so it stays out of the
 *    initial bundle. First paint shows the DcyfrSkeleton shimmer; the scene
 *    hydrates afterward.
 * 2. Respect prefers-reduced-motion: render a static CSS gradient instead of
 *    the animated scene for users who opt out of motion.
 * 3. Absolute-positioned background layer: the hero copy + CTAs render on top.
 *
 * Usage:
 *   <div className="relative">
 *     <AgentNetworkHero />
 *     <HeroCopy />
 *   </div>
 */

import * as React from 'react';
import dynamic from 'next/dynamic';
import { DcyfrSkeleton } from '@/components/ui/dcyfr-skeleton';

const AgentNetworkScene = dynamic(
  () =>
    import('./agent-network-scene').then((mod) => mod.AgentNetworkScene),
  {
    ssr: false,
    loading: () => (
      <DcyfrSkeleton
        variant="shimmer"
        className="absolute inset-0 size-full rounded-none bg-transparent"
        aria-hidden="true"
      />
    ),
  },
);

function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Static fallback rendered for:
 * - prefers-reduced-motion users (always)
 * - Playwright snapshot captures (the suite sets reduced-motion)
 *
 * The gradient mimics the scene's palette without motion or WebGL cost.
 */
function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 size-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%),radial-gradient(ellipse_at_30%_80%,hsl(var(--accent)/0.08),transparent_60%)]"
    />
  );
}

export interface AgentNetworkHeroProps {
  /** Override the container className (default: absolute, inset-0, -z-10). */
  className?: string;
}

export function AgentNetworkHero({ className }: AgentNetworkHeroProps) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={
        className ??
        'pointer-events-none absolute inset-0 -z-10 size-full overflow-hidden'
      }
    >
      {reduced ? <StaticFallback /> : <AgentNetworkScene />}
    </div>
  );
}

export default AgentNetworkHero;
