"use client";

import { StatusPill, type PaymentStatus } from "@/components/ui/status";
import { lagosTime, naira, type Deposit, type DepositStatus } from "@/lib/use-api";

/**
 * How each deposit state reads to a person. "Credited" is used only for
 * SUCCESS, the one state where the money is in the available balance. HELD
 * and REVIEW mean the money reached us but is not spendable yet, so they say
 * so instead of looking like a success.
 */
const WORDS: Record<DepositStatus, { status: PaymentStatus; label: string; note?: string }> = {
  SUCCESS: { status: "successful", label: "Credited" },
  PENDING: { status: "pending", label: "Processing", note: "Waiting for the bank to confirm." },
  HELD: {
    status: "pending",
    label: "Held for review",
    note: "Received, but over a limit, so it isn't spendable yet. Contact support.",
  },
  REVIEW: {
    status: "pending",
    label: "Under review",
    note: "Received, but needs a check before it is credited. Contact support.",
  },
  FAILED: { status: "failed", label: "Failed", note: "No money was taken for this one." },
  ABANDONED: { status: "failed", label: "Not completed" },
};

export function DepositList({ deposits }: { deposits: Deposit[] }) {
  if (deposits.length === 0) {
    return <p className="text-[14px] text-muted">No top-ups yet. A transfer you make will show up here.</p>;
  }
  return (
    <ul className="divide-y divide-line">
      {deposits.map((d) => {
        const w = WORDS[d.status] ?? WORDS.PENDING;
        return (
          <li key={d.reference} className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="num text-[15px] font-semibold text-ink">{naira(d.amount_kobo)}</p>
              <p className="text-[12px] text-muted">
                {lagosTime(d.paid_at ?? d.created_at)}
                {d.fee_kobo > 0 && d.status === "SUCCESS"
                  ? ` · ${naira(d.charge_kobo)} sent, ${naira(d.fee_kobo)} fee`
                  : ""}
              </p>
              {w.note ? <p className="mt-1 text-[12px] text-muted">{w.note}</p> : null}
            </div>
            <StatusPill status={w.status} label={w.label} />
          </li>
        );
      })}
    </ul>
  );
}
