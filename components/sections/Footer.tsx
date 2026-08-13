import { ExternalLink } from "@/components/ui/ExternalLink";
import { BUY_URL, CONTRACT, TIKTOK_URL, X_URL } from "@/components/config";

export function Footer() {
  return (
    <footer>
      <div className="footer-top"><a className="wordmark light" href="#top">BAMNU<span>.</span></a><p>THE PANDA WHO REFUSED TO QUIT.</p><div><ExternalLink href={X_URL}>X ↗</ExternalLink><ExternalLink href={TIKTOK_URL}>TIKTOK ↗</ExternalLink><ExternalLink href={BUY_URL}>PUMP.FUN ↗</ExternalLink></div></div>
      <div className="disclaimer"><strong>READ THIS PART.</strong><p>BAMNU is a meme coin. Cryptocurrency is speculative and highly volatile. Nothing on this website is financial advice. Verify every link and the complete contract address. Never invest more than you can afford to lose.</p></div>
      <div className="footer-bottom"><span>© 2026 BAMNU. BUILT ONE STUBBORN STEP AT A TIME.</span><code>{CONTRACT}</code></div>
    </footer>
  );
}
