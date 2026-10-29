import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { PageHeader, Panel } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { StatusPill } from "@/components/ui/status";
import { ServiceIcon } from "@/components/app/ui";
import { SPEND_SUMMARY, TRANSACTIONS, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Transaction history" };

const TOTALS = [
  {
    title: "October successful spending",
    detail: `${SPEND_SUMMARY.successfulCount} paid bills`,
    value: SPEND_SUMMARY.successfulTotal,
  },
  {
    title: "Pending payments",
    detail: `${SPEND_SUMMARY.pendingCount} payment · Held`,
    value: SPEND_SUMMARY.pendingTotal,
  },
  {
    title: "Failed attempts",
    detail: `${SPEND_SUMMARY.failedCount} attempt · Not charged`,
    value: SPEND_SUMMARY.failedTotal,
  },
];

export default function TransactionHistoryPage() {
  return (
    <>
      <PageHeader back="Overview" backHref="/app" title="Transaction history" />

      <div className="flex flex-col gap-5">
        {/* Three stat tiles, not a chart: three figures in the same unit that
            are read rather than compared. */}
        <dl className="grid gap-5 md:grid-cols-3">
          {TOTALS.map((t) => (
            <div key={t.title} className="bs-card bs-edge rounded-[var(--radius-card)] p-6">
              <dt className="bs-raise text-lg font-semibold text-primary-text">{t.title}</dt>
              <dd className="bs-raise mt-3 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[13px] text-muted">{t.detail}</span>
                <span className="text-[1.375rem] leading-none font-semibold text-ink">
                  {money(t.value)}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <Panel
          title="Your payment activity"
          aside={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
            >
              <Download aria-hidden className="size-4" />
              Export filtered CSV
            </button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <label htmlFor="tx-q" className="text-[13px] font-medium text-muted">
                Search transactions
              </label>
              <Search
                aria-hidden
                className="pointer-events-none absolute bottom-3 left-3.5 size-4 text-muted"
              />
              <input
                id="tx-q"
                type="search"
                placeholder="Enter service or reference"
                className="mt-1.5 h-11 w-full rounded-[var(--radius-field)] border border-line bg-surface pr-3 pl-10 text-[14px] text-ink placeholder:text-muted focus-visible:border-primary"
              />
            </div>
            {[
              { id: "tx-range", label: "Date range", options: ["1–18 Oct 2026", "Last 7 days", "Last 90 days"] },
              { id: "tx-service", label: "Service", options: ["All payment services", "Airtime", "Data Bundles", "Electricity", "Cable TV", "Exam Pins", "Bulk SMS"] },
              { id: "tx-status", label: "Status", options: ["Any status", "Successful", "Pending", "Failed"] },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="text-[13px] font-medium text-muted">
                  {f.label}
                </label>
                <select
                  id={f.id}
                  className="mt-1.5 h-11 w-full rounded-[var(--radius-field)] border border-line bg-surface px-3 text-[14px] text-ink"
                >
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <ChoiceGroup
            className="mt-4"
            legend="Activity type"
            name="activityType"
            options={["Payments", "Wallet credits"]}
            defaultValue="Payments"
          />

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">
              <caption className="sr-only">Your payment attempts, newest first</caption>
              <thead>
                <tr className="border-y border-line bg-surface2">
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Service / reference
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Date &amp; time
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold tracking-wide text-muted uppercase">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.reference} className="border-b border-line last:border-0 hover:bg-surface2">
                    <th scope="row" className="px-4 py-4 font-normal">
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
                    <td className="px-4 py-4">
                      <span className="block text-ink">{tx.date}</span>
                      <span className="num block text-[12px] text-muted">{tx.time}</span>
                    </td>
                    <td className="num px-4 py-4 text-right font-semibold whitespace-nowrap text-ink">
                      {money(tx.amount)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusPill status={tx.status} />
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/app/transactions/${tx.reference}`}
                        className="inline-flex items-center gap-1 font-semibold text-primary-text underline-offset-4 hover:underline"
                      >
                        {tx.status === "successful" ? "Receipt" : "Details"}
                        <ChevronRight aria-hidden className="size-3.5" />
                        <span className="sr-only"> for {tx.reference}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav
            aria-label="Transaction pages"
            className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px]"
          >
            <p className="text-muted">
              Showing 1–{TRANSACTIONS.length} of {SPEND_SUMMARY.totalAttempts} payment attempts ·
              Page 1 of 4
            </p>
            <ul className="flex items-center gap-1">
              <li>
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-1 rounded-[var(--radius-chip)] px-3 py-1.5 text-muted disabled:opacity-40"
                >
                  <ChevronLeft aria-hidden className="size-4" />
                  Previous
                </button>
              </li>
              {[1, 2, 3, 4].map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    aria-current={n === 1 ? "page" : undefined}
                    className={
                      n === 1
                        ? "size-8 rounded-[var(--radius-chip)] bg-primary font-semibold text-white"
                        : "size-8 rounded-[var(--radius-chip)] text-muted hover:bg-surface2 hover:text-ink"
                    }
                  >
                    {n}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-[var(--radius-chip)] px-3 py-1.5 font-medium text-ink hover:bg-surface2"
                >
                  Next
                  <ChevronRight aria-hidden className="size-4" />
                </button>
              </li>
            </ul>
          </nav>
        </Panel>

        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted">
          <Link
            href="/app/support/report"
            className="inline-flex items-center gap-1 font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            Report a transaction issue
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
          <span>
            Wallet credits are separate from spending. Pending and failed attempts are excluded
            from successful spending.
          </span>
        </p>
      </div>
    </>
  );
}
