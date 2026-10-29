import { CalendarDays, Download } from "lucide-react";
import { KpiRow, AttentionBanner, NeedsAttention, ProviderHealth } from "@/components/admin/overview-panels";
import { TrendChart } from "@/components/admin/trend-chart";
import { ServiceBars } from "@/components/admin/service-bars";
import { TransactionsTable } from "@/components/admin/transactions-table";
import { PERIOD } from "@/lib/admin-data";

/**
 * BAOSWITCH • Admin dashboard — the Overview screen.
 *
 * The date range sits once, here, above everything it scopes: the KPI row,
 * both charts and the table all describe the same slice, so a per-card range
 * would let two numbers on one screen disagree about which week they mean.
 */
export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] font-semibold text-ink">
            Platform overview
          </h1>
          <p className="mt-1 text-[13px] text-muted">
            A clear view of payments, performance and what needs your attention.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-chip)] border border-line bg-surface px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-line2"
          >
            <CalendarDays aria-hidden className="size-4 text-muted" />
            {PERIOD.label}
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-chip)] bg-primary px-4 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] transition-[filter] hover:brightness-105"
          >
            <Download aria-hidden className="size-4" />
            Export report
          </button>
        </div>
      </div>

      <KpiRow />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <TrendChart />
        <ServiceBars />
      </div>

      <AttentionBanner />

      <TransactionsTable />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <NeedsAttention />
        <ProviderHealth />
      </div>

      <p className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[12px] text-muted">
        <span>
          Illustrative demo data, not live statistics. Changes compare with {PERIOD.compare}. All
          times WAT.
        </span>
        <span>BAOSWITCH Technologies · Admin dashboard</span>
      </p>
    </div>
  );
}
