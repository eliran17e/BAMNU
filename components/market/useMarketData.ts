"use client";

import { useEffect, useState } from "react";

export type MarketData = {
  ok: boolean;
  empty?: boolean;
  priceUsd?: number | null;
  marketCap?: number | null;
  volume24h?: number | null;
  priceChange24h?: number | null;
  liquidityUsd?: number | null;
  txns24h?: number | null;
  pairUrl?: string | null;
};

export type MarketState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error" }
  | { status: "live"; data: MarketData };

const POLL_MS = 50_000;

export function useMarketData(): MarketState {
  const [state, setState] = useState<MarketState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/market");
        if (!res.ok) throw new Error(String(res.status));
        const data: MarketData = await res.json();
        if (cancelled) return;
        if (!data.ok) setState({ status: "error" });
        else if (data.empty || data.priceUsd == null) setState({ status: "empty" });
        else setState({ status: "live", data });
      } catch {
        if (!cancelled) setState((prev) => (prev.status === "live" ? prev : { status: "error" }));
      }
    }

    load();
    const timer = window.setInterval(() => {
      if (!document.hidden) load();
    }, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return state;
}
