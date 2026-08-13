"use client";

import { useMarketData } from "./useMarketData";
import { formatChange, formatCompactUsd, formatPrice } from "./format";

export function MarketStats() {
  const market = useMarketData();

  if (market.status === "loading") {
    return (
      <div className="market-stats" aria-live="polite">
        <div className="stat skeleton"><span>PRICE</span><b>· · ·</b></div>
        <div className="stat skeleton"><span>MARKET CAP</span><b>· · ·</b></div>
        <div className="stat skeleton"><span>24H VOLUME</span><b>· · ·</b></div>
        <div className="stat skeleton"><span>24H</span><b>· · ·</b></div>
      </div>
    );
  }

  if (market.status === "empty" || market.status === "error") {
    return (
      <div className="market-stats" aria-live="polite">
        <div className="stat wide"><span>MARKET</span><b className="pulse-text">LIVE ON PUMP.FUN · CHART WARMING UP…</b></div>
      </div>
    );
  }

  const { data } = market;
  const change = formatChange(data.priceChange24h);
  return (
    <div className="market-stats" aria-live="polite">
      <div className="stat"><span>PRICE</span><b>{formatPrice(data.priceUsd)}</b></div>
      <div className="stat"><span>MARKET CAP</span><b>{formatCompactUsd(data.marketCap)}</b></div>
      <div className="stat"><span>24H VOLUME</span><b>{formatCompactUsd(data.volume24h)}</b></div>
      <div className={`stat ${change.direction}`}><span>24H</span><b>{change.text}</b></div>
    </div>
  );
}
