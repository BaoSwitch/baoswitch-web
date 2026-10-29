import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowLeftRight,
  Users,
  XCircle,
} from "lucide-react";
import { ATTENTION, KPIS, PROVIDER_HEALTH, PERIOD, type Kpi } from "@/lib/admin-data";
import { ServiceStatus } from "@/components/ui/status";
import { cn } from "@/lib/cn";

const KPI_ICONS = {
  swap: ArrowLeftRight,
  chart: BarChart3,
  users: Users,
  check: CheckCircle2,
} as const;

/**
 * The KPI row.
 *
 * Stat tiles rather than a grouped bar chart — four headline numbers whose
 * job is to be read, not compared to each other (they are in four different
 * units). Values use the font's proportional figures: `tabular-nums` is for
 * columns that must align vertically, and at display size it makes a figure
 * like ₦486,200 look loose.
 */
export function KpiRow() {
  return (
    <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((kpi: Kpi) => {
        const Icon = KPI_ICONS[kpi.icon];
        const Arrow = kpi.delta.direction === "up" ? ArrowUpRight : ArrowDownRight;
        return (
          <div
            key={kpi.label}
            className="bs-card bs-edge flex flex-col gap-3 rounded-[var(--radius-card)] p-5"
          >
            <div className="bs-raise flex items-start justify-between gap-3">
              <dt className="text-[13px] text-muted">{kpi.label}</dt>
              <Icon aria-hidden className="size-[18px] shrink-0 text-muted" strokeWidth={1.8} />
            </div>
            <dd className="bs-raise text-[clamp(1.75rem,1.4rem+1vw,2.125rem)] leading-none font-semibold text-ink">
              {kpi.value}
            </dd>
            <div className="bs-raise flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] text-muted">{kpi.sub}</p>
              <p
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium",
                  kpi.delta.good ? "bg-success-soft text-success" : "bg-error-soft text-error",
                )}
              >
                <Arrow aria-hidden className="size-3" />
                {kpi.delta.value}
                <span className="sr-only"> versus {PERIOD.compare}</span>
              </p>
            </div>
          </div>
        );
      })}
    </dl>
  );
}

/**
 * The delayed-provider banner. `role="status"` rather than `role="alert"`:
 * it is present on load and describes a condition, so it should not
 * interrupt a screen reader mid-sentence.
 */
export function AttentionBanner() {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-[var(--radius-field)] border border-warning/30 bg-warning-soft px-5 py-3.5"
    >
      <AlertTriangle aria-hidden className="size-[18px] shrink-0 text-warning" />
      <p className="min-w-0 flex-1 text-[13px] text-warning">
        Electricity provider response is delayed. 42 of 240 pending payments are older than 15
        minutes.
      </p>
      <Link
        href="/admin/transactions?status=pending"
        className="inline-flex items-center gap-1 text-[13px] font-semibold text-warning underline-offset-4 hover:underline"
      >
        Review queue
        <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </div>
  );
}

const ATTENTION_ICONS = { clock: Clock, x: XCircle, message: MessageSquare } as const;
const ATTENTION_TONE = {
  warning: "text-warning",
  error: "text-error",
  info: "text-primary-text",
} as const;

export function NeedsAttention() {
  return (
    <section className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
      <div className="bs-raise flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold text-ink">Needs attention</h2>
        <p className="text-[12px] text-muted">Selected period · {PERIOD.label}</p>
      </div>

      <dl className="bs-raise mt-5 grid gap-4 sm:grid-cols-3">
        {ATTENTION.map((item) => {
          const Icon = ATTENTION_ICONS[item.icon];
          return (
            <div
              key={item.label}
              className="flex flex-col gap-2 rounded-[var(--radius-field)] border border-line bg-surface2 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <dd className="text-[1.75rem] leading-none font-semibold text-ink">
                  {item.value}
                </dd>
                <Icon
                  aria-hidden
                  className={cn("size-[18px] shrink-0", ATTENTION_TONE[item.tone])}
                  strokeWidth={1.8}
                />
              </div>
              <dt className="text-[13px] font-medium text-ink">{item.label}</dt>
              <p className="text-[12px] text-muted">{item.sub}</p>
              <Link
                href={item.action.href}
                className={cn(
                  "mt-auto inline-flex items-center gap-1 pt-1 text-[12px] font-semibold underline-offset-4 hover:underline",
                  ATTENTION_TONE[item.tone],
                )}
              >
                {item.action.label}
                <ArrowRight aria-hidden className="size-3" />
              </Link>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export function ProviderHealth() {
  const healthy = PROVIDER_HEALTH.filter((p) => p.state === "operational").length;
  return (
    <section className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
      <div className="bs-raise flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-semibold text-ink">Provider health</h2>
        <p className="text-[12px] text-muted">
          {healthy} of {PROVIDER_HEALTH.length} routes healthy
        </p>
      </div>

      <dl className="bs-raise mt-5 flex flex-col">
        {PROVIDER_HEALTH.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0"
          >
            <dt className="text-[13px] text-ink">{p.name}</dt>
            <dd>
              <ServiceStatus state={p.state} />
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href="/admin/providers"
        className="bs-raise mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
      >
        Manage providers &amp; service pricing
        <ArrowRight aria-hidden className="size-3.5" />
      </Link>
    </section>
  );
}
