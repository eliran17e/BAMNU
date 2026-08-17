"use client";

import { useState } from "react";
import { CONTRACT } from "@/components/config";

type CopyState = "idle" | "copied" | "failed";

// Fallback for in-app browsers (TikTok/Telegram/X webviews) where the async
// clipboard API is unavailable or blocked. Needs iOS-specific selection calls.
function legacyCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.opacity = "0";
  document.body.appendChild(area);
  const selection = document.getSelection();
  const previous = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
  area.select();
  area.setSelectionRange(0, text.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  if (previous && selection) {
    selection.removeAllRanges();
    selection.addRange(previous);
  }
  return ok;
}

export function CopyButton({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<CopyState>("idle");

  async function copyAddress() {
    let ok = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(CONTRACT);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) ok = legacyCopy(CONTRACT);
    if (!ok) {
      // last resort: select the nearest visible contract text so a long-press copy works
      const code = document.querySelector(".contract-box code, .hero-contract code, .final-contract code");
      if (code) {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = document.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), ok ? 2400 : 4000);
  }

  const label =
    state === "copied" ? (compact ? "COPIED ✓" : "COPIED. STAY SHARP, PANDA.")
    : state === "failed" ? "HOLD TEXT TO COPY"
    : compact ? "COPY CA" : "COPY ADDRESS";

  return (
    <button className={`copy-button ${compact ? "compact" : ""} ${state === "copied" ? "copied" : ""}`} onClick={copyAddress} type="button" aria-live="polite">
      <span>{label}</span>
      <span aria-hidden="true">{state === "copied" ? "✓" : state === "failed" ? "!" : "↗"}</span>
    </button>
  );
}
