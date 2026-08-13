import { Reveal } from "@/components/fx/Reveal";
import { currentDay } from "@/components/config";

export function BuildInPublic() {
  const day = currentDay();
  return (
    <section className="public-build" aria-labelledby="public-title">
      <div className="public-image"><img src="/assets/built-public.webp" alt="BAMNU appearing on a community broadcast" loading="lazy" width="900" height="900" /></div>
      <Reveal><div className="public-copy">
        <p className="kicker">06 / BUILD IN PUBLIC</p>
        <h2 id="public-title">{day} DAYS.<br/>ALL OUT IN<br/>THE OPEN.</h2>
        <p>Logos. Videos. Updates. Memes. Milestones. Setbacks. Stress. Laughter. Very little sleep.</p>
        <p>We didn’t wait until it looked perfect. We shared the process while it was still messy.</p>
        <strong>WATCH THE NEXT CHAPTER HAPPEN IN REAL TIME. →</strong>
      </div></Reveal>
    </section>
  );
}
