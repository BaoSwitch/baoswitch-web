import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, Search, SlidersHorizontal } from "lucide-react";
import { StatusPill } from "@/components/ui/status";
import { TRANSACTIONS, TOTAL_TRANSACTIONS, formatAmount } from "@/lib/admin-data";

/**
 * The transaction list.
 *
 * A real `<table>` with `scope` on every header and the reference as each
 * row's header, so a screen reader reads "Ada Okafor, Data Bundles, ₦1,500.00,
 * Successful" instead of five loose cells. Money is `tabular-nums` and
 * right-aligned — this is the case `tabular-nums` exists for, unlike the KPI
 * values above.
 *
 * The frame repeats the page-level 12–18 Oct date picker inside this card's
 * toolbar. One date range governs the whole view, so the duplicate is gone
 * and only the filters that scope the table itself remain here.
 */
export function TransactionsTable() {
  return (
    <section className="bs-card bs-edge flex flex-col overflow-hidden rounded-[var(--radius-card)]">
      <div className="bs-raise flex flex-wrap items-start justify-between gap-4 p-6">
        <div>
          <h2 className="font-semibold text-ink">Transaction management</h2>
          <p className="text-[13px] text-muted">Review payments across the platform.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
        >
          <Download aria-hidden className="size-4" />
          Export CSV
        </button>
      </div>

      <div className="bs-raise flex flex-wrap gap-3 px-6 pb-5">
        <div className="relative min-w-[15rem] flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
          />
          <label htmlFor="tx-search" className="sr-only">
            Search transactions
          </label>
          <input
            id="tx-search"
            type="search"
            placeholder="Search reference, customer or phone"
            className="h-10 w-full rounded-[var(--radius-chip)] border border-line bg-surface2 pr-4 pl-10 text-[13px] text-ink placeholder:text-muted focus-visible:border-primary"
          />
        </div>
        <label className="sr-only" htmlFor="tx-service">
          Filter by service
        </label>
        <select
          id="tx-service"
          defaultValue=""
          className="h-10 rounded-[var(--radius-chip)] border border-line bg-surface px-3 text-[13px] text-ink"
        >
          <option value="">All services</option>
          <option>Data Bundles</option>
          <option>Airtime</option>
          <option>Electricity</option>
          <option>Cable TV</option>
          <option>Exam Pins</option>
          <option>Bulk SMS</option>
        </select>
        <label className="sr-only" htmlFor="tx-status">
          Filter by status
        </label>
        <select
          id="tx-status"
          defaultValue=""
          className="h-10 rounded-[var(--radius-chip)] border border-line bg-surface px-3 text-[13px] text-ink"
        >
          <option value="">All statuses</option>
          <option>Successful</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-line2"
        >
          <SlidersHorizontal aria-hidden className="size-4" />
          More filters
        </button>
      </div>

      <div className="bs-raise overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <caption className="sr-only">
            Recent transactions across the platform, newest first
          </caption>
          <thead>
            <tr className="border-y border-line bg-surface2">
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Customer / reference
              </th>
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Service
              </th>
              <th scope="col" className="px-6 py-3 font-semibold tracking-wide text-muted uppercase">
                Date &amp; time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right font-semibold tracking-wide text-muted uppercase"
              >
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
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.reference} className="border-b border-line last:border-0 hover:bg-surface2">
                <th scope="row" className="px-6 py-4 font-normal">
                  <span className="block font-semibold text-ink">{tx.customer}</span>
                  <span className="num block text-[12px] text-muted">{tx.reference}</span>
                </th>
                <td className="px-6 py-4 text-ink">{tx.service}</td>
                <td className="px-6 py-4">
                  <span className="block text-ink">{tx.date}</span>
                  <span className="num block text-[12px] text-muted">{tx.time}</span>
                </td>
                <td className="num px-6 py-4 text-right font-semibold whitespace-nowrap text-ink">
                  {formatAmount(tx.amount)}
                </td>
                <td className="px-6 py-4">
                  <StatusPill status={tx.status} />
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/transactions/${tx.reference}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary-text underline-offset-4 hover:underline"
                  >
                    Review
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> transaction {tx.reference}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav
        aria-label="Transaction pages"
        className="bs-raise flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-[13px]"
      >
        <p className="text-muted">
          Showing 1–{TRANSACTIONS.length} of {TOTAL_TRANSACTIONS.toLocaleString("en-NG")}{" "}
          transactions · All times WAT
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
          {[1, 2, 3].map((n) => (
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
          <li aria-hidden className="px-1 text-muted">
            …
          </li>
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
    </section>
  );
}
