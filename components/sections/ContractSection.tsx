import { CopyButton } from "@/components/ui/CopyButton";
import { CONTRACT } from "@/components/config";
import { Reveal } from "@/components/fx/Reveal";

export function ContractSection() {
  return (
    <section className="contract-section section-pad" aria-labelledby="contract-title">
      <Reveal className="reveal-stamp"><div className="contract-stamp">THE<br/>REAL<br/>ONE</div></Reveal>
      <Reveal delay={120}><div className="contract-content">
        <p className="kicker">03 / OFFICIAL CONTRACT ADDRESS</p>
        <h2 id="contract-title">COPY IT.<br/><em>CHECK IT.</em><br/>CHECK IT AGAIN.</h2>
        <div className="contract-box"><code>{CONTRACT}</code><CopyButton /></div>
        <p className="warning"><span>!</span> Impersonator tokens exist. Verify every character before you trade.</p>
      </div></Reveal>
    </section>
  );
}
