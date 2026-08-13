import { CONTRACT } from "@/components/config";

const DEX_URL = `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`;

type DexPair = {
  chainId: string;
  url?: string;
  priceUsd?: string;
  marketCap?: number;
  fdv?: number;
  volume?: { h24?: number };
  priceChange?: { h24?: number };
  liquidity?: { usd?: number };
  txns?: { h24?: { buys?: number; sells?: number } };
};

export async function GET() {
  try {
    const res = await fetch(DEX_URL, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data: { pairs: DexPair[] | null } = await res.json();
    const pairs = (data.pairs ?? []).filter((p) => p.chainId === "solana");
    if (pairs.length === 0) {
      return Response.json({ ok: true, empty: true }, { headers: cache() });
    }
    // pump.fun tokens can have a pump pair plus a Raydium pair post-migration;
    // the highest-liquidity pair is the canonical market.
    const pair = pairs.reduce((a, b) => ((a.liquidity?.usd ?? 0) >= (b.liquidity?.usd ?? 0) ? a : b));
    return Response.json(
      {
        ok: true,
        empty: false,
        priceUsd: pair.priceUsd ? Number(pair.priceUsd) : null,
        marketCap: pair.marketCap ?? pair.fdv ?? null,
        volume24h: pair.volume?.h24 ?? null,
        priceChange24h: pair.priceChange?.h24 ?? null,
        liquidityUsd: pair.liquidity?.usd ?? null,
        txns24h: (pair.txns?.h24?.buys ?? 0) + (pair.txns?.h24?.sells ?? 0) || null,
        pairUrl: pair.url ?? null,
        updatedAt: Date.now(),
      },
      { headers: cache() }
    );
  } catch {
    return Response.json({ ok: false }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}

function cache() {
  return { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" };
}
