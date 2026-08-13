import { principles } from "@/components/content";

export function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <div className="manifesto-intro">
        <p className="kicker">05 / THE BAMNU MANIFESTO</p>
        <h2 id="manifesto-title">THE RULES ARE<br/>PRETTY SIMPLE.</h2>
        <p className="scribble">We wrote them down anyway.</p>
      </div>
      <div className="principles">
        {principles.map((item, index) => <div className={`principle p${index + 1}`} key={item}><span>{item}</span><i aria-hidden="true">{index % 2 ? "✦" : "×"}</i></div>)}
      </div>
    </section>
  );
}
