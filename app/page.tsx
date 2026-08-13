"use client";

import { useEffect, useRef, useState } from "react";

const BUY_URL = "https://join.pump.fun/HSag/1fkbwgaw";
const X_URL = "https://x.com/bamnu83?s=11";
const TIKTOK_URL = "https://www.tiktok.com/@bamnu98?_r=1&_t=ZS-97pswaV9Szq";
const CONTRACT = "AfM4MiNox7Wn3Up9P2ac2MQnJciny7Kigd6dVTThpump";

const journey = [
  { day: "DAY 1", title: "One idea.", copy: "One stubborn panda.", image: "/assets/day-one.webp", alt: "BAMNU panda in a bamboo forest" },
  { day: "THE GRIND", title: "Make. Post. Repeat.", copy: "Logos, videos, memes, setbacks, stress, laughter—and very little sleep.", image: "/assets/the-grind.webp", alt: "BAMNU panda cooking in a bamboo kitchen" },
  { day: "DAY 38", title: "BAMNU launches.", copy: "Not the finish line. Just the first chapter finally leaving the group chat.", image: "/assets/day-38.webp", alt: "BAMNU panda at a desk" },
  { day: "TODAY", title: "You’re here.", copy: "Now the community writes what happens next.", image: "/assets/community-stage.webp", alt: "BAMNU panda with the community" },
];

const principles = ["NO FAKE HYPE", "NO PRETENDING", "BUILD IN PUBLIC", "KEEP SHOWING UP", "REFUSE TO QUIT", "TOGETHER WE BUILD", "TOGETHER WE GROW"];

const roadmap = [
  { phase: "PHASE 1", title: "THE BIRTH", emoji: "🐼", status: "done", items: [["✅", "Create BAMNU"], ["✅", "Build the community"], ["✅", "Launch the website & socials"], ["🔥", "Official Launch — 10.08.2026"]] },
  { phase: "PHASE 2", title: "THE TAKEOVER", emoji: "🚀", status: "active", items: [["🔥", "Grow the BAMNU family"], ["📢", "Meme campaigns & community events"], ["🤝", "Collaborations with creators & communities"], ["📈", "Increase visibility across X & TikTok"]] },
  { phase: "PHASE 3", title: "BAMNU EVERYWHERE", emoji: "🌎", status: "next", items: [["🌎", "Expand the community"], ["🔥", "Bigger marketing campaigns"], ["🐼", "More memes, more content, more chaos"], ["🤝", "New partnerships & opportunities"]] },
  { phase: "PHASE 4", title: "THE LONG RUN", emoji: "🏆", status: "next", items: [["💎", "Keep building"], ["🐼", "Keep growing"], ["🚀", "Keep pushing"], ["♾️", "BAMNU is here to stay."]] },
];

// One S-curve per phase; pathLength is normalized to 1 so scroll progress maps directly.
const ROAD_PATH = "M50 0 C10 80 10 170 50 250 C90 330 90 420 50 500 C10 580 10 670 50 750 C90 830 90 920 50 1000";
const STOP_FRACTIONS = [0.125, 0.375, 0.625, 0.875];

const buySteps = [
  ["01", "GET A WALLET", "Use a Solana-compatible wallet you trust."],
  ["02", "ADD SOL", "Fund it with enough SOL for your trade and network fees."],
  ["03", "OPEN PUMP.FUN", "Use the official BAMNU link on this page."],
  ["04", "VERIFY + DECIDE", "Match the full contract address. Trade responsibly."],
];

const faqs = [
  ["What is BAMNU?", "BAMNU is a Solana meme coin and an internet character built publicly from zero—one stubborn step at a time."],
  ["Why a panda?", "Because pandas look calm while quietly refusing to cooperate. That felt right."],
  ["How was BAMNU created?", "The creator shared 38 days of logos, videos, memes, milestones, setbacks, and building in public."],
  ["Where can I buy $BAMNU?", "Only through the official Pump.fun link shown throughout this site. Always verify the complete contract address."],
  ["What is the official contract address?", CONTRACT],
  ["Is BAMNU financial advice?", "No. BAMNU is a meme coin, crypto is highly volatile, and nothing here is financial advice."],
  ["Where can I follow the journey?", "Follow @bamnu83 on X and @bamnu98 on TikTok for the next chapter."],
];

function ExternalLink({ href, className = "", children, label }: { href: string; className?: string; children: React.ReactNode; label?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
}

function CopyButton({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(CONTRACT);
    } catch {
      const area = document.createElement("textarea");
      area.value = CONTRACT;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <button className={`copy-button ${compact ? "compact" : ""} ${copied ? "copied" : ""}`} onClick={copyAddress} type="button" aria-live="polite">
      <span>{copied ? "COPIED. STAY SHARP, PANDA." : compact ? "COPY CA" : "COPY ADDRESS"}</span>
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
    </button>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [reaction, setReaction] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
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
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="BAMNU home">BAMNU<span>.</span></a>
        <div className="nav-links">
          <a href="#story">STORY</a>
          <a href="#roadmap">ROADMAP</a>
          <a href="#how-to-buy">HOW TO BUY</a>
          <a href="#community">COMMUNITY</a>
        </div>
        <ExternalLink href={BUY_URL} className="nav-buy">BUY <span>$BAMNU</span> ↗</ExternalLink>
      </nav>

      <section ref={heroRef} id="top" className={`hero ${heroVisible ? "is-active" : "is-paused"}`} aria-labelledby="hero-title">
        <div className="grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse-dot" /> SOLANA · BUILT IN PUBLIC</p>
          <h1 id="hero-title"><span>BAMNU—</span>THE PANDA WHO <em>REFUSED</em> TO QUIT.</h1>
          <p className="hero-lede">Started from zero. Built together. No fake hype—just one stubborn creator, one panda, and 38 days of showing up.</p>
          <div className="hero-actions">
            <ExternalLink href={BUY_URL} className="button button-primary">BUY $BAMNU <span>↗</span></ExternalLink>
            <a href="#community" className="button button-secondary">JOIN THE JOURNEY <span>↓</span></a>
          </div>
          <div className="hero-contract">
            <div><span>OFFICIAL CONTRACT</span><code>{CONTRACT}</code></div>
            <CopyButton compact />
          </div>
        </div>

        <div className="walk-stage" aria-label="BAMNU keeps walking">
          <div className="sun-disc" aria-hidden="true" />
          <div className="bamboo bamboo-back" aria-hidden="true"><i/><i/><i/><i/></div>
          <div className="walk-quote" aria-hidden="true">DAY 38<br/>STILL WALKING</div>
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

      <section id="story" className="story section-pad" aria-labelledby="story-title">
        <header className="section-heading">
          <p className="kicker">01 / ORIGIN STORY</p>
          <h2 id="story-title">38 DAYS.<br/><em>ZERO</em> SHORTCUTS.</h2>
          <p>Not a polished origin myth. Just the receipts.</p>
        </header>
        <div className="timeline">
          {journey.map((item, index) => (
            <article className="timeline-card" key={item.day}>
              <div className="timeline-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="timeline-image"><img src={item.image} alt={item.alt} loading="lazy" width="900" height="900" /></div>
              <div className="timeline-copy"><span>{item.day}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
              <div className="step-print" aria-hidden="true">🐾</div>
            </article>
          ))}
        </div>
      </section>

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

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="manifesto-intro">
          <p className="kicker">03 / THE BAMNU MANIFESTO</p>
          <h2 id="manifesto-title">THE RULES ARE<br/>PRETTY SIMPLE.</h2>
          <p className="scribble">We wrote them down anyway.</p>
        </div>
        <div className="principles">
          {principles.map((item, index) => <div className={`principle p${index + 1}`} key={item}><span>{item}</span><i aria-hidden="true">{index % 2 ? "✦" : "×"}</i></div>)}
        </div>
      </section>

      <section id="how-to-buy" className="how-buy section-pad" aria-labelledby="buy-title">
        <header className="section-heading inverse">
          <p className="kicker">04 / HOW TO BUY</p>
          <h2 id="buy-title">FOUR STEPS.<br/>NO FUNNY BUSINESS.</h2>
          <p>No custom wallet connection. No mystery swap. Just the official link.</p>
        </header>
        <div className="buy-grid">
          {buySteps.map(([number, title, copy]) => <article className="buy-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="buy-bottom">
          <ExternalLink href={BUY_URL} className="button button-lime">OPEN OFFICIAL PUMP.FUN <span>↗</span></ExternalLink>
          <p>Crypto is speculative and highly volatile. Slow down, verify everything, and never risk more than you can afford to lose.</p>
        </div>
      </section>

      <section className="contract-section section-pad" aria-labelledby="contract-title">
        <div className="contract-stamp">THE<br/>REAL<br/>ONE</div>
        <div className="contract-content">
          <p className="kicker">05 / OFFICIAL CONTRACT ADDRESS</p>
          <h2 id="contract-title">COPY IT.<br/><em>CHECK IT.</em><br/>CHECK IT AGAIN.</h2>
          <div className="contract-box"><code>{CONTRACT}</code><CopyButton /></div>
          <p className="warning"><span>!</span> Impersonator tokens exist. Verify every character before you trade.</p>
        </div>
      </section>

      <section className="public-build" aria-labelledby="public-title">
        <div className="public-image"><img src="/assets/built-public.webp" alt="BAMNU appearing on a community broadcast" loading="lazy" width="900" height="900" /></div>
        <div className="public-copy">
          <p className="kicker">06 / BUILD IN PUBLIC</p>
          <h2 id="public-title">38 DAYS.<br/>ALL OUT IN<br/>THE OPEN.</h2>
          <p>Logos. Videos. Updates. Memes. Milestones. Setbacks. Stress. Laughter. Very little sleep.</p>
          <p>We didn’t wait until it looked perfect. We shared the process while it was still messy.</p>
          <strong>WATCH THE NEXT CHAPTER HAPPEN IN REAL TIME. →</strong>
        </div>
      </section>

      <section id="community" className="community section-pad" aria-labelledby="community-title">
        <header>
          <p className="kicker">07 / COMMUNITY</p>
          <h2 id="community-title">STARTED FROM ZERO.<br/><em>BUILT TOGETHER.</em></h2>
          <p>The comments are open. The timeline is live. The panda is still walking.</p>
        </header>
        <div className="social-stack">
          <ExternalLink href={X_URL} className="social-link"><span><i>X</i> FOLLOW THE BUILD</span><b>@BAMNU83</b><em>↗</em></ExternalLink>
          <ExternalLink href={TIKTOK_URL} className="social-link"><span><i>♪</i> WATCH THE CHAOS</span><b>@BAMNU98</b><em>↗</em></ExternalLink>
          <ExternalLink href={BUY_URL} className="social-link"><span><i>↗</i> OFFICIAL MARKET</span><b>PUMP.FUN</b><em>↗</em></ExternalLink>
        </div>
      </section>

      <section className="meme-wall section-pad" aria-labelledby="meme-title">
        <div className="meme-header"><div><p className="kicker">08 / MEME WALL</p><h2 id="meme-title">PANDA<br/>PROPAGANDA.</h2></div><p>Official BAMNU moments for now.<br/>Community chaos coming next.</p></div>
        <div className="meme-grid">
          <figure className="meme-large"><img src="/assets/day-one.webp" alt="BAMNU at the river at sunrise" loading="lazy"/><figcaption>ONE PANDA. ONE PLAN. SORT OF.</figcaption></figure>
          <figure className="meme-square"><img src="/assets/the-grind.webp" alt="BAMNU cooking through the grind" loading="lazy"/><figcaption>LET HIM COOK.</figcaption></figure>
          <figure className="meme-square purple"><img src="/assets/day-38.webp" alt="BAMNU watching the charts" loading="lazy"/><figcaption>DAY 38: STILL AWAKE.</figcaption></figure>
          <div className="meme-placeholder"><span>YOUR ART<br/>COULD LIVE<br/>HERE.</span><small>REAL COMMUNITY WORK ONLY.</small></div>
        </div>
      </section>

      <section className="faq section-pad" aria-labelledby="faq-title">
        <header><p className="kicker">09 / FAQ</p><h2 id="faq-title">SHORT ANSWERS.<br/>STRAIGHT FACE.</h2></header>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <div className="final-noise" aria-hidden="true" />
        <img src="/assets/mascot-logo.webp" alt="BAMNU panda holding up a peace sign" loading="lazy"/>
        <div className="final-copy">
          <p className="kicker">THE FIRST CHAPTER IS LIVE</p>
          <h2 id="final-title">THE PANDA<br/>IS STILL <em>WALKING.</em></h2>
          <div className="final-actions">
            <ExternalLink href={BUY_URL} className="button button-primary">BUY $BAMNU ↗</ExternalLink>
            <ExternalLink href={X_URL} className="text-link">X / @BAMNU83 ↗</ExternalLink>
            <ExternalLink href={TIKTOK_URL} className="text-link">TIKTOK / @BAMNU98 ↗</ExternalLink>
          </div>
          <div className="final-contract"><code>{CONTRACT}</code><CopyButton compact /></div>
        </div>
      </section>

      <footer>
        <div className="footer-top"><a className="wordmark light" href="#top">BAMNU<span>.</span></a><p>THE PANDA WHO REFUSED TO QUIT.</p><div><ExternalLink href={X_URL}>X ↗</ExternalLink><ExternalLink href={TIKTOK_URL}>TIKTOK ↗</ExternalLink><ExternalLink href={BUY_URL}>PUMP.FUN ↗</ExternalLink></div></div>
        <div className="disclaimer"><strong>READ THIS PART.</strong><p>BAMNU is a meme coin. Cryptocurrency is speculative and highly volatile. Nothing on this website is financial advice. Verify every link and the complete contract address. Never invest more than you can afford to lose.</p></div>
        <div className="footer-bottom"><span>© 2026 BAMNU. BUILT ONE STUBBORN STEP AT A TIME.</span><code>{CONTRACT}</code></div>
      </footer>
    </main>
  );
}
