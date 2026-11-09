"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Eye, EyeOff, Plus, Wallet } from "lucide-react";
import { naira, useApi, type DedicatedAccount, type Wallet as WalletData } from "@/lib/use-api";

/**
 * The wallet hero on the Overview screen.
 *
 * The eye toggle hides the balance for someone reading over your shoulder,
 * so it swaps the figure for dots rather than blurring it, and announces
 * which state it is in. The account number has a real copy button — the
 * frame draws a copy glyph but a glyph alone does not say what happened, so
 * this one confirms.
 */
export function WalletCard() {
  const [shown, setShown] = useState(true);
  const [copied, setCopied] = useState(false);
  const wallet = useApi<WalletData>("/wallet");
  const account = useApi<DedicatedAccount>("/wallet/account");
  const active = account.data?.status === "ACTIVE" ? account.data : null;

  async function copy() {
    try {
      if (active?.account_number) await navigator.clipboard.writeText(active.account_number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number stays visible and selectable.
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-card-lg,26px)] bg-primary p-6 text-white shadow-e2 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="flex items-center gap-2 text-[15px] text-white/90">
          <Wallet aria-hidden className="size-[18px]" />
          Available wallet balance
          <button
            type="button"
            onClick={() => setShown((v) => !v)}
            aria-pressed={!shown}
            aria-label={shown ? "Hide balance" : "Show balance"}
            className="inline-flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            {shown ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
        </h2>
        <p className="text-[13px] text-white/80">NGN wallet</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] leading-none font-semibold">
          {!shown || !wallet.data ? "₦ ••••••" : naira(wallet.data.available_kobo)}
        </p>
        <Link
          href="/app/wallet/fund"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-primary-text transition-colors hover:bg-primary-soft"
        >
          <Plus aria-hidden className="size-4" />
          Fund wallet
        </Link>
      </div>

      <hr className="my-5 border-0 border-t border-white/25" />

      <dl className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div>
          <dt className="text-[12px] tracking-wide text-white/80 uppercase">
            Your dedicated virtual account
          </dt>
          <dd className="mt-1 flex items-center gap-2 text-[15px] font-medium">
            <span className="num">
              {active ? `${active.bank_name} · ${active.account_number}` : "Not set up yet"}
            </span>
            {active ? (
            <button
              type="button"
              onClick={copy}
              className="inline-flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <Copy aria-hidden className="size-4" />
              <span className="sr-only">Copy account number</span>
            </button>
            ) : null}
            <span aria-live="polite" className="text-[12px] text-white/90">
              {copied ? "Copied" : ""}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-[12px] tracking-wide text-white/80 uppercase">Account name</dt>
          <dd className="mt-1 text-[15px] font-medium">{active?.account_name ?? "—"}</dd>
        </div>
      </dl>

      {wallet.error ? (
        <p role="alert" className="mt-4 text-[12px] text-white">
          We couldn&rsquo;t load your balance. Refresh to try again.
        </p>
      ) : wallet.data && wallet.data.held_kobo + wallet.data.frozen_kobo > 0 ? (
        <p className="mt-4 text-[12px] text-white/80">
          {naira(wallet.data.held_kobo + wallet.data.frozen_kobo)} is held for payments in progress
          and is already excluded from the balance above.
        </p>
      ) : null}
    </section>
  );
}
