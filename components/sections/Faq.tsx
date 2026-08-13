import { faqs } from "@/components/content";
import { Reveal } from "@/components/fx/Reveal";

export function Faq() {
  return (
    <section className="faq section-pad" aria-labelledby="faq-title">
      <Reveal><header><p className="kicker">09 / FAQ</p><h2 id="faq-title">SHORT ANSWERS.<br/>STRAIGHT FACE.</h2></header></Reveal>
      <Reveal delay={100}><div className="faq-list">
        {faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}
      </div></Reveal>
    </section>
  );
}
