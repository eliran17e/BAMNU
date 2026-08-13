"use client";

import { useEffect, useRef, useState } from "react";
import { roadmap, ROAD_PATH, STOP_FRACTIONS } from "@/components/content";

export function Roadmap() {
  const railRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const pandaRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    const path = roadPathRef.current;
    const progressPath = progressPathRef.current;
    const panda = pandaRef.current;
    if (!rail || !path || !progressPath || !panda) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = path.getTotalLength();
    // The SVG stretches to fill the rail (preserveAspectRatio="none"), so points
    // from getPointAtLength are in viewBox units and must be scaled to the rail.
    const toRail = (fraction: number, rect: DOMRect) => {
      const pt = path.getPointAtLength(fraction * total);
      return { x: (pt.x / 100) * rect.width, y: (pt.y / 1000) * rect.height };
    };

    const layoutStops = () => {
      const rect = rail.getBoundingClientRect();
      stopRefs.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = toRail(STOP_FRACTIONS[i], rect);
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      });
    };

    let frame = 0;
    const update = () => {
      const rect = rail.getBoundingClientRect();
      const progress = reduced ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top) / rect.height));
      const { x, y } = toRail(progress, rect);
      panda.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      // Reveal the green road down to the panda's y. The path only ever descends,
      // so a vertical clip tracks the walker exactly (dash offsets drift when the
      // SVG is stretched non-uniformly).
      progressPath.style.clipPath = `inset(0 0 ${(100 - (y / rect.height) * 100).toFixed(2)}% 0)`;
      setPassedCount(STOP_FRACTIONS.filter((f) => progress >= f).length);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      layoutStops();
      onScroll();
    };

    layoutStops();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="roadmap" className="roadmap section-pad" aria-labelledby="roadmap-title">
      <header className="section-heading">
        <p className="kicker">02 / ROADMAP</p>
        <h2 id="roadmap-title">THE ROAD<br/><em>AHEAD.</em></h2>
        <p>Four phases. One stubborn panda walking all of them.</p>
      </header>
      <div className="road-track">
        <div className="road-rail" ref={railRef} aria-hidden="true">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" focusable="false">
            <path ref={roadPathRef} className="road-base" d={ROAD_PATH} pathLength={1} />
            <path className="road-dashes" d={ROAD_PATH} pathLength={1} />
            <path ref={progressPathRef} className="road-progress" d={ROAD_PATH} pathLength={1} />
          </svg>
          {roadmap.map((phase, index) => (
            <div className={`road-stop ${passedCount > index ? "passed" : ""}`} key={phase.phase} ref={(el) => { stopRefs.current[index] = el; }}>
              <span>{phase.emoji}</span>
            </div>
          ))}
          <div className="road-panda" ref={pandaRef}>
            <img src="/assets/mascot-logo.webp" alt="" width="120" height="120" />
          </div>
        </div>
        {roadmap.map((phase, index) => (
          <article className={`road-card ${phase.status} ${passedCount > index ? "passed" : ""}`} key={phase.phase} style={{ gridRow: index + 1 }}>
            <span className="road-status">{phase.status === "done" ? "COMPLETE" : phase.status === "active" ? "IN PROGRESS" : "UP NEXT"}</span>
            <p className="road-kicker">{phase.phase}</p>
            <h3>{phase.title} <span aria-hidden="true">{phase.emoji}</span></h3>
            <ul>
              {phase.items.map(([icon, text]) => <li key={text}><i aria-hidden="true">{icon}</i>{text}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="road-tagline">This is not a project built for a few days. <strong>We&rsquo;re here for the long run. 🐼❤️</strong></p>
    </section>
  );
}
