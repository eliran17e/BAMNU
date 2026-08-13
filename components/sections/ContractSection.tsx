import { CopyButton } from "@/components/ui/CopyButton";
import { CONTRACT } from "@/components/config";

export function ContractSection() {
  return (
    <section className="contract-section section-pad" aria-labelledby="contract-title">
      <div className="contract-stamp">THE<br/>REAL<br/>ONE</div>
      <div className="contract-content">
        <p className="kicker">05 / OFFICIAL CONTRACT ADDRESS</p>
        <h2 id="contract-title">COPY IT.<br/><em>CHECK IT.</em><br/>CHECK IT AGAIN.</h2>
        <div className="contract-box"><code>{CONTRACT}</code><CopyButton /></div>
        <p className="warning"><span>!</span> Impersonator tokens exist. Verify every character before you trade.</p>
      </div>
    </section>
  );
}
