"use client";

import { useState } from "react";
import { CONTRACT } from "@/components/config";

export function CopyButton({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(CONTRACT);
    } catch {
      const area = document.createElement("textarea");
      area.value = CONTRACT;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <button className={`copy-button ${compact ? "compact" : ""} ${copied ? "copied" : ""}`} onClick={copyAddress} type="button" aria-live="polite">
      <span>{copied ? "COPIED. STAY SHARP, PANDA." : compact ? "COPY CA" : "COPY ADDRESS"}</span>
      <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
    </button>
  );
}
