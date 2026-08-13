const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

export function formatCompactUsd(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `$${compact.format(value)}`;
}

// Tiny pump.fun prices like 0.00000042 render as $0.0₆42 (6 leading zeros).
export function formatPrice(value: number | null | undefined): string {
  if (value == null || !Number.isFinite(value) || value <= 0) return "—";
  if (value >= 0.01) return `$${value.toLocaleString("en", { maximumSignificantDigits: 4 })}`;
  const text = value.toFixed(20);
  const match = text.match(/^0\.(0*)(\d{1,4})/);
  if (!match) return `$${value}`;
  const zeros = match[1].length;
  const digits = match[2].replace(/0+$/, "") || "0";
  if (zeros < 3) return `$0.${match[1]}${digits}`;
  const sub = String(zeros).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("");
  return `$0.0${sub}${digits}`;
}

export function formatChange(value: number | null | undefined): { text: string; direction: "up" | "down" | "flat" } {
  if (value == null || !Number.isFinite(value)) return { text: "—", direction: "flat" };
  const clamped = Math.max(-999, Math.min(999, value));
  const text = `${clamped > 0 ? "+" : ""}${clamped.toFixed(1)}%`;
  return { text, direction: clamped > 0 ? "up" : clamped < 0 ? "down" : "flat" };
}
