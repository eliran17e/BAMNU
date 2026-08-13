export const BUY_URL = "https://join.pump.fun/HSag/1fkbwgaw";
export const X_URL = "https://x.com/bamnu83?s=11";
export const TIKTOK_URL = "https://www.tiktok.com/@bamnu98?_r=1&_t=ZS-97pswaV9Szq";
export const CONTRACT = "AfM4MiNox7Wn3Up9P2ac2MQnJciny7Kigd6dVTThpump";

// Day 1 of the build-in-public journey (launch on 2026-08-10 was day 38).
export const DAY_ONE_UTC = Date.UTC(2026, 6, 4);

export function currentDay(): number {
  return Math.max(1, Math.floor((Date.now() - DAY_ONE_UTC) / 86_400_000) + 1);
}
