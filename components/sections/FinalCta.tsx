import { ExternalLink } from "@/components/ui/ExternalLink";
import { CopyButton } from "@/components/ui/CopyButton";
import { BUY_URL, CONTRACT, TIKTOK_URL, X_URL } from "@/components/config";

export function FinalCta() {
  return (
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
  );
}
