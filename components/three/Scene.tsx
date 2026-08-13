"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GREEN = new THREE.Color("#9eea22");
const PURPLE = new THREE.Color("#9738ee");

function makeGlowTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function ParticleField({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(makeGlowTexture, []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
      color.copy(Math.random() < 0.72 ? GREEN : PURPLE).multiplyScalar(0.55 + Math.random() * 0.45);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    const cloud = points.current;
    if (!cloud) return;
    const t = state.clock.elapsedTime;
    // whole-cloud motion: zero per-frame attribute writes
    cloud.rotation.y = t * 0.016;
    cloud.rotation.x = Math.sin(t * 0.11) * 0.03;
    cloud.position.y = Math.sin(t * 0.19) * 0.25;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={texture} size={0.22} vertexColors transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

const GLYPH_COUNT = 14;

export function BambooGlyphs() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: GLYPH_COUNT }, () => ({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 11,
        z: -2 - Math.random() * 5,
        spin: 0.2 + Math.random() * 0.5,
        bob: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.9,
      })),
    []
  );

  useFrame((state) => {
    const instanced = mesh.current;
    if (!instanced) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((seed, i) => {
      dummy.position.set(seed.x, seed.y + Math.sin(t * seed.bob + seed.phase) * 0.4, seed.z);
      dummy.rotation.set(0.3, t * seed.spin + seed.phase, 0.25);
      dummy.scale.setScalar(seed.scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, GLYPH_COUNT]}>
      <cylinderGeometry args={[0.055, 0.055, 1.15, 6]} />
      <meshBasicMaterial color="#3f7a2d" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}

export function Scene({ particleCount }: { particleCount: number }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = rig.current;
    if (!group) return;
    // ease the whole scene toward the pointer for parallax depth
    group.rotation.y += (state.pointer.x * 0.08 - group.rotation.y) * 0.04;
    group.rotation.x += (-state.pointer.y * 0.05 - group.rotation.x) * 0.04;
  });

  return (
    <group ref={rig}>
      <ParticleField count={particleCount} />
      <BambooGlyphs />
    </group>
  );
}
