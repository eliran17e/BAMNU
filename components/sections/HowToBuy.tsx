import { ExternalLink } from "@/components/ui/ExternalLink";
import { BUY_URL } from "@/components/config";
import { buySteps } from "@/components/content";

export function HowToBuy() {
  return (
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
  );
}
