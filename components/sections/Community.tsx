import { ExternalLink } from "@/components/ui/ExternalLink";
import { BUY_URL, TELEGRAM_URL, TIKTOK_URL, X_URL } from "@/components/config";
import { Reveal } from "@/components/fx/Reveal";

export function Community() {
  return (
    <section id="community" className="community section-pad" aria-labelledby="community-title">
      <Reveal><header>
        <p className="kicker">07 / COMMUNITY</p>
        <h2 id="community-title">STARTED FROM ZERO.<br/><em>BUILT TOGETHER.</em></h2>
        <p>The comments are open. The timeline is live. The panda is still walking.</p>
      </header></Reveal>
      <Reveal delay={100}><div className="social-stack">
        <ExternalLink href={X_URL} className="social-link"><span><i>X</i> FOLLOW THE BUILD</span><b>@BAMNU83</b><em>↗</em></ExternalLink>
        <ExternalLink href={TIKTOK_URL} className="social-link"><span><i>♪</i> WATCH THE CHAOS</span><b>@BAMNU98</b><em>↗</em></ExternalLink>
        <ExternalLink href={TELEGRAM_URL} className="social-link"><span><i>➤</i> JOIN THE DEN</span><b>TELEGRAM</b><em>↗</em></ExternalLink>
        <ExternalLink href={BUY_URL} className="social-link"><span><i>↗</i> OFFICIAL MARKET</span><b>PUMP.FUN</b><em>↗</em></ExternalLink>
      </div></Reveal>
    </section>
  );
}
