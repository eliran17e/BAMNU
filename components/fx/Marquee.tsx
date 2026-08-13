export function Marquee({ items }: { items: string[] }) {
  const half = (hidden: boolean) => (
    <div className="marquee-half" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`}>{item}<i aria-hidden="true">✦</i></span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">{half(false)}{half(true)}</div>
    </div>
  );
}
