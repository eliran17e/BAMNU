"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { CopyButton } from "@/components/ui/CopyButton";
import { BUY_URL, CONTRACT, currentDay } from "@/components/config";
import { MarketStats } from "@/components/market/MarketStats";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false, loading: () => null });

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [reaction, setReaction] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [wantsMotion, setWantsMotion] = useState(false);
  const day = currentDay();

  useEffect(() => {
    setWantsMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (reduced || window.innerWidth < 760) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        hero.style.setProperty("--px", x.toFixed(3));
        hero.style.setProperty("--py", y.toFixed(3));
      });
    };
    const scroll = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 1.4)));
      document.documentElement.style.setProperty("--walk", progress.toFixed(3));
    };
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(hero);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function react() {
    if (reaction) return;
    setReaction(true);
    window.setTimeout(() => setReaction(false), 1100);
  }

  return (
    <section ref={heroRef} id="top" className={`hero ${heroVisible ? "is-active" : "is-paused"}`} aria-labelledby="hero-title">
      <div className="grain" aria-hidden="true" />
      {wantsMotion && <HeroCanvas active={heroVisible} />}
      <div className="hero-copy">
        <p className="eyebrow"><span className="pulse-dot" /> SOLANA · BUILT IN PUBLIC</p>
        <h1 id="hero-title"><span>BAMNU—</span>THE PANDA WHO <em>REFUSED</em> TO QUIT.</h1>
        <p className="hero-lede">Started from zero. Built together. No fake hype—just one stubborn creator, one panda, and 38 days of showing up.</p>
        <div className="hero-actions">
          <ExternalLink href={BUY_URL} className="button button-primary">BUY $BAMNU <span>↗</span></ExternalLink>
          <a href="#community" className="button button-secondary">JOIN THE JOURNEY <span>↓</span></a>
        </div>
        <MarketStats />
        <div className="hero-contract">
          <div><span>OFFICIAL CONTRACT</span><code>{CONTRACT}</code></div>
          <CopyButton compact />
        </div>
      </div>

      <div className="walk-stage" aria-label="BAMNU keeps walking">
        <div className="sun-disc" aria-hidden="true" data-day={day} suppressHydrationWarning />
        <div className="bamboo bamboo-back" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="walk-quote" aria-hidden="true" suppressHydrationWarning>DAY {day}<br/>STILL WALKING</div>
        <button className={`mascot-button ${reaction ? "reacting" : ""}`} type="button" onClick={react} aria-label="Tap BAMNU for a reaction">
          <span className="mascot-shadow" />
          <img src="/assets/mascot-logo.webp" alt="BAMNU, the panda who refused to quit" width="1000" height="1000" fetchPriority="high" />
          <span className="tap-note">TAP THE PANDA ↑</span>
          <span className="reaction-note" aria-hidden="true">STILL HERE!</span>
        </button>
        <div className="dust" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="footprints" aria-hidden="true"><span>●</span><span>●</span><span>●</span><span>●</span><span>●</span></div>
        <div className="bamboo bamboo-front" aria-hidden="true"><i/><i/><i/></div>
        <div className="ground-line" aria-hidden="true" />
      </div>
      <a className="scroll-cue" href="#story"><span>SCROLL TO KEEP WALKING</span><i>↓</i></a>
    </section>
  );
}
