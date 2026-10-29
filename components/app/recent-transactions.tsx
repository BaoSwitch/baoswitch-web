import Link from "next/link";
import { ArrowUpRight, ChevronRight, Download } from "lucide-react";
import { StatusPill } from "@/components/ui/status";
import { ServiceIcon } from "@/components/app/ui";
import { TRANSACTIONS, money, type Tx } from "@/lib/app-data";

/**
 * The recent-payments table.
 *
 * A real `<table>`: the reference is each row's header, money is right-
 * aligned and tabular so the column lines up, and the per-row action names
 * the transaction it belongs to for anyone hearing the links out of context.
 */
export function RecentTransactions({ rows = TRANSACTIONS }: { rows?: Tx[] }) {
  return (
    <section className="bs-card bs-edge overflow-hidden rounded-[var(--radius-card)]">
      <div className="bs-raise flex flex-wrap items-start justify-between gap-3 p-6">
        <div>
          <h2 className="text-lg font-semibold text-primary-text">Recent transactions</h2>
          <p className="mt-1 text-[13px] text-muted">Your latest payments, all in one place.</p>
        </div>
        <Link
          href="/app/transactions"
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
        >
          <ArrowUpRight aria-hidden className="size-4" />
          View all history
        </Link>
      </div>

      <div className="bs-raise overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <caption className="sr-only">Your five most recent payments</caption>
          <thead>
            <tr className="border-y border-line bg-surface2">
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Service / reference
              </th>
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Date &amp; time
              </th>
              <th scope="col" className="px-6 py-3 text-right font-semibold tracking-wide text-muted uppercase">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Status
              </th>
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tx) => (
              <tr key={tx.reference} className="border-b border-line last:border-0 hover:bg-surface2">
                <th scope="row" className="px-6 py-4 font-normal">
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-chip)] bg-primary-soft text-primary-text">
                      <ServiceIcon name={tx.icon} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">
                        {tx.service} · {tx.provider}
                      </span>
                      <span className="num block text-[12px] text-muted">{tx.reference}</span>
                    </span>
                  </span>
                </th>
                <td className="px-6 py-4">
                  <span className="block text-ink">{tx.date}</span>
                  <span className="num block text-[12px] text-muted">{tx.time}</span>
                </td>
                <td className="num px-6 py-4 text-right font-semibold whitespace-nowrap text-ink">
                  {money(tx.amount)}
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={tx.status} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/app/transactions/${tx.reference}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary-text underline-offset-4 hover:underline"
                  >
                    {tx.status === "successful" ? (
                      <>
                        Receipt
                        <Download aria-hidden className="size-3.5" />
                      </>
                    ) : (
                      <>
                        Details
                        <ChevronRight aria-hidden className="size-3.5" />
                      </>
                    )}
                    <span className="sr-only"> for {tx.reference}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="bs-raise px-6 py-4 text-[12px] text-muted">
        Showing your latest {rows.length} payments · Failed payments are not charged.
      </p>
    </section>
  );
}
