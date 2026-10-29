"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { DemoChip } from "@/components/ui/status";

/**
 * The prepaid electricity token.
 *
 * Hidden until asked for: a token is a bearer credential, and this page is
 * reachable from a history list someone may open with a colleague looking
 * on. Hiding is the default, revealing is a deliberate act, and the button
 * says which state it is in rather than relying on an eye glyph alone.
 */
export function TokenReveal({ value, note }: { value: string; note: string }) {
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; reveal still shows the digits to read off.
    }
  }

  return (
    <div className="rounded-[var(--radius-field)] border border-line bg-surface2 p-5">
      <DemoChip>Dummy token · not valid</DemoChip>
      <p className="num mt-3 text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-semibold tracking-wide text-ink">
        {shown ? value : "•••• •••• •••• •••• ••••"}
      </p>
      <p className="mt-1 text-[12px] text-muted">{note}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-pressed={shown}
          className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
        >
          {shown ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
          {shown ? "Hide token" : "Reveal token"}
        </button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
        >
          <Copy aria-hidden className="size-4" />
          Copy token
        </button>
        <span aria-live="polite" className="text-[12px] text-muted">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </div>
  );
}
