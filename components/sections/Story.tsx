import { journey } from "@/components/content";

export function Story() {
  return (
    <section id="story" className="story section-pad" aria-labelledby="story-title">
      <header className="section-heading">
        <p className="kicker">01 / ORIGIN STORY</p>
        <h2 id="story-title">38 DAYS.<br/><em>ZERO</em> SHORTCUTS.</h2>
        <p>Not a polished origin myth. Just the receipts.</p>
      </header>
      <div className="timeline">
        {journey.map((item, index) => (
          <article className="timeline-card" key={item.day}>
            <div className="timeline-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="timeline-image"><img src={item.image} alt={item.alt} loading="lazy" width="900" height="900" /></div>
            <div className="timeline-copy"><span>{item.day}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
            <div className="step-print" aria-hidden="true">🐾</div>
          </article>
        ))}
      </div>
    </section>
  );
}
