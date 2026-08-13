"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

export default function HeroCanvas({ active }: { active: boolean }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [dead, setDead] = useState(false);
  const [particleCount, setParticleCount] = useState(2200);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    try {
      const probe = document.createElement("canvas");
      setSupported(!!(probe.getContext("webgl2") || probe.getContext("webgl")));
    } catch {
      setSupported(false);
    }
    setParticleCount(window.innerWidth < 760 ? 800 : 2200);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!supported || dead) return null;

  return (
    <div className="hero-webgl" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 9], fov: 55 }}
        frameloop={active && pageVisible ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            setDead(true);
          });
        }}
      >
        <fogExp2 attach="fog" args={["#060807", 0.045]} />
        <Scene particleCount={particleCount} />
      </Canvas>
    </div>
  );
}
