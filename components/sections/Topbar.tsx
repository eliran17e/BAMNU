import { ExternalLink } from "@/components/ui/ExternalLink";
import { BUY_URL, TELEGRAM_URL, TIKTOK_URL, X_URL } from "@/components/config";

export function Topbar() {
  return (
    <nav className="topbar" aria-label="Primary navigation">
      <a className="wordmark" href="#top" aria-label="BAMNU home">BAMNU<span>.</span></a>
      <div className="nav-links">
        <a href="#story">STORY</a>
        <a href="#roadmap">ROADMAP</a>
        <a href="#how-to-buy">HOW TO BUY</a>
        <a href="#community">COMMUNITY</a>
      </div>
      <div className="nav-cta">
        <div className="nav-socials">
          <ExternalLink href={X_URL} label="BAMNU on X"><span aria-hidden="true">𝕏</span></ExternalLink>
          <ExternalLink href={TIKTOK_URL} label="BAMNU on TikTok"><span aria-hidden="true">♪</span></ExternalLink>
          <ExternalLink href={TELEGRAM_URL} label="BAMNU Telegram community"><span aria-hidden="true">➤</span></ExternalLink>
        </div>
        <ExternalLink href={BUY_URL} className="nav-buy">BUY <span>$BAMNU</span> ↗</ExternalLink>
      </div>
    </nav>
  );
}
