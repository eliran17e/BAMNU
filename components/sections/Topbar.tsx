import { ExternalLink } from "@/components/ui/ExternalLink";
import { BUY_URL } from "@/components/config";

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
      <ExternalLink href={BUY_URL} className="nav-buy">BUY <span>$BAMNU</span> ↗</ExternalLink>
    </nav>
  );
}
