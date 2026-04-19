'use client';

/**
 * AgentNetworkScene — abstract neon-teal agent network
 *
 * A cluster of 18 spherical nodes floating in 3D space, connected by thin
 * edges to their nearest neighbors. The whole graph drifts via auto-rotation
 * and a gentle per-node float offset. Color scheme is the dcyfr-ai-web
 * identity (primary: neon teal, accent: magenta).
 *
 * Heavy-weight — mounts only client-side. Reduced-motion users get a
 * static gradient fallback upstream (see agent-network-hero.tsx).
 */

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type NodeDef = {
  position: [number, number, number];
  size: number;
  hue: 'primary' | 'accent';
};

// Deterministic pseudo-random points on a bounded sphere. Fixed seed so
// server-side hydration and client-side render agree (no FOUC / layout shift).
function seededNodes(count: number): NodeDef[] {
  const out: NodeDef[] = [];
  // Fibonacci-sphere distribution with a slight random jitter for organic feel.
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // [-1, 1]
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const jitter = ((i * 7919) % 100) / 400; // stable per-index jitter ~[0, 0.25]
    const r = 2.3 + jitter;
    out.push({
      position: [
        Math.cos(theta) * radius * r,
        y * r * 0.9,
        Math.sin(theta) * radius * r,
      ],
      size: 0.09 + ((i * 3989) % 7) / 100, // 0.09–0.16
      hue: i % 5 === 0 ? 'accent' : 'primary',
    });
  }
  return out;
}

const NODES = seededNodes(18);

// Build the edge list: connect each node to its 2 nearest neighbors.
const EDGES: Array<[number, number]> = (() => {
  const edges = new Set<string>();
  for (let i = 0; i < NODES.length; i++) {
    const distances = NODES.map((n, j) => ({
      j,
      d: Math.hypot(
        n.position[0] - NODES[i].position[0],
        n.position[1] - NODES[i].position[1],
        n.position[2] - NODES[i].position[2],
      ),
    }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of distances) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      edges.add(key);
    }
  }
  return Array.from(edges).map((k) => k.split('-').map(Number) as [number, number]);
})();

const COLORS = {
  // HSL → hex at mount time so we don't re-parse per frame. These mirror the
  // .theme-dcyfr-ai-web CSS vars: --primary: 172 90% 50%, --accent: 316 90% 60%.
  primary: new THREE.Color().setHSL(172 / 360, 0.9, 0.5),
  accent: new THREE.Color().setHSL(316 / 360, 0.9, 0.6),
  edge: new THREE.Color().setHSL(172 / 360, 0.7, 0.45),
};

function Node({ node }: { node: NodeDef }) {
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh position={node.position}>
        <sphereGeometry args={[node.size, 20, 20]} />
        <meshStandardMaterial
          color={COLORS[node.hue]}
          emissive={COLORS[node.hue]}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Edges() {
  // Flatten edge vertices into a single BufferGeometry for one draw call.
  const positions = React.useMemo(() => {
    const arr = new Float32Array(EDGES.length * 2 * 3);
    EDGES.forEach(([a, b], idx) => {
      const base = idx * 6;
      arr[base + 0] = NODES[a].position[0];
      arr[base + 1] = NODES[a].position[1];
      arr[base + 2] = NODES[a].position[2];
      arr[base + 3] = NODES[b].position[0];
      arr[base + 4] = NODES[b].position[1];
      arr[base + 5] = NODES[b].position[2];
    });
    return arr;
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={COLORS.edge}
        transparent
        opacity={0.35}
        linewidth={1}
      />
    </lineSegments>
  );
}

function Scene() {
  const groupRef = React.useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });
  return (
    <group ref={groupRef}>
      {NODES.map((node, i) => (
        <Node key={i} node={node} />
      ))}
      <Edges />
    </group>
  );
}

export function AgentNetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      aria-hidden="true"
    >
      <color attach="background" args={[0x000000]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={COLORS.primary} />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color={COLORS.accent} />
      <Scene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

export default AgentNetworkScene;
