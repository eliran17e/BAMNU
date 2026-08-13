import { Reveal } from "@/components/fx/Reveal";

export function MemeWall() {
  return (
    <section className="meme-wall section-pad" aria-labelledby="meme-title">
      <Reveal><div className="meme-header"><div><p className="kicker">08 / MEME WALL</p><h2 id="meme-title">PANDA<br/>PROPAGANDA.</h2></div><p>Official BAMNU moments for now.<br/>Community chaos coming next.</p></div></Reveal>
      <Reveal delay={120}><div className="meme-grid">
        <figure className="meme-large"><img src="/assets/day-one.webp" alt="BAMNU at the river at sunrise" loading="lazy"/><figcaption>ONE PANDA. ONE PLAN. SORT OF.</figcaption></figure>
        <figure className="meme-square"><img src="/assets/the-grind.webp" alt="BAMNU cooking through the grind" loading="lazy"/><figcaption>LET HIM COOK.</figcaption></figure>
        <figure className="meme-square purple"><img src="/assets/day-38.webp" alt="BAMNU watching the charts" loading="lazy"/><figcaption>DAY 38: STILL AWAKE.</figcaption></figure>
        <div className="meme-placeholder"><span>YOUR ART<br/>COULD LIVE<br/>HERE.</span><small>REAL COMMUNITY WORK ONLY.</small></div>
      </div></Reveal>
    </section>
  );
}
