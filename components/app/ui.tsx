import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Clock,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------- headings */

/** Back link + title + optional lead, the top of every dashboard screen. */
export function PageHeader({
  back,
  backHref,
  title,
  lead,
  aside,
}: {
  back: string;
  backHref: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {back}
        </Link>
        <h1 className="mt-2 text-[clamp(1.5rem,1.2rem+1.1vw,2rem)] font-semibold text-primary-text">
          {title}
        </h1>
        {lead ? <p className="mt-1.5 text-[15px] text-muted">{lead}</p> : null}
      </div>
      {aside}
    </header>
  );
}

/** The two-column body every detail screen uses: content, then a rail. */
export function SplitBody({ children, rail }: { children: ReactNode; rail: ReactNode }) {
  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
      <aside className="flex flex-col gap-5">{rail}</aside>
    </div>
  );
}

/* ---------------------------------------------------------------- panel */

export function Panel({
  title,
  lead,
  aside,
  className,
  children,
}: {
  title?: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("bs-card bs-edge rounded-[var(--radius-card)] p-6", className)}>
      {title ? (
        <div className="bs-raise mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-primary-text">{title}</h2>
            {lead ? <p className="mt-1 text-[13px] text-muted">{lead}</p> : null}
          </div>
          {aside}
        </div>
      ) : null}
      <div className="bs-raise">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- rows */

/**
 * A read-only field: the bordered label/value box the frames use for details
 * that are displayed rather than typed. It is a `<dl>` pair, not a disabled
 * input — a disabled input would be skipped by a screen reader's form
 * navigation and implies an edit that is not on offer.
 */
export function FieldBox({
  label,
  value,
  hint,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[var(--radius-field)] border border-line p-4", className)}>
      <dt className="text-[13px] font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-[15px] text-ink">{value}</dd>
      {hint ? <dd className="mt-1 text-[12px] text-muted">{hint}</dd> : null}
    </div>
  );
}

/** A label/value line in a summary rail or receipt. */
export function DetailRow({
  label,
  value,
  strong,
}: {
  label: ReactNode;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd
        className={cn(
          "num text-right text-[14px] text-ink",
          strong && "text-[16px] font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/* --------------------------------------------------------------- notice */

/**
 * The callouts the frames use throughout. `tone` is the meaning, and each
 * tone brings its own icon so the colour is never the only cue.
 */
export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: "info" | "warning" | "error";
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const Icon = tone === "info" ? ShieldCheck : tone === "warning" ? Clock : Circle;
  const tones = {
    info: "border-primary/20 bg-primary-soft text-primary-text",
    warning: "border-warning/30 bg-warning-soft text-warning",
    error: "border-error/30 bg-error-soft text-error",
  } as const;
  return (
    <div
      role={tone === "info" ? undefined : "status"}
      className={cn("flex gap-3 rounded-[var(--radius-field)] border p-4", tones[tone], className)}
    >
      <Icon aria-hidden className="mt-0.5 size-[18px] shrink-0" />
      <div className="min-w-0 text-[13px] leading-relaxed">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className={title ? "mt-0.5" : undefined}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- timeline */

export type Step = {
  label: string;
  detail?: ReactNode;
  state: "done" | "current" | "upcoming";
};

/**
 * The progress rail on every status screen.
 *
 * An ordered list, with the state spelled out for assistive tech rather than
 * left to a tick-versus-ring shape that only reads visually.
 */
export function Timeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => (
        <li key={step.label} className="flex gap-3">
          <span className="flex flex-col items-center">
            <span
              aria-hidden
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full",
                step.state === "done" && "text-success",
                step.state === "current" && "text-warning",
                step.state === "upcoming" && "text-muted",
              )}
            >
              {step.state === "done" ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : step.state === "current" ? (
                <span className="size-2.5 rounded-full bg-current ring-4 ring-[var(--bs-warning-soft)]" />
              ) : (
                <span className="size-2.5 rounded-full border-2 border-current" />
              )}
            </span>
            {i < steps.length - 1 ? (
              <span aria-hidden className="my-1 w-px flex-1 bg-line" />
            ) : null}
          </span>
          <div className="min-w-0 pb-5 last:pb-0">
            <p
              className={cn(
                "text-[14px] font-semibold",
                step.state === "upcoming" ? "text-muted" : "text-ink",
              )}
            >
              {step.label}
              <span className="sr-only">
                {step.state === "done"
                  ? " — complete"
                  : step.state === "current"
                    ? " — in progress"
                    : " — not started"}
              </span>
            </p>
            {step.detail ? (
              <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{step.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- icons */

const SERVICE_ICONS = {
  airtime: Smartphone,
  data: Wifi,
  electricity: Lightbulb,
  cable: Tv,
  exam: GraduationCap,
  sms: MessageSquare,
} as const;

export type ServiceIconKey = keyof typeof SERVICE_ICONS;

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  const Icon = SERVICE_ICONS[name];
  return <Icon aria-hidden className={cn("size-5", className)} strokeWidth={1.8} />;
}

/** A trailing "do the next thing" link, used at the foot of rail cards. */
export function RailLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
    >
      {children}
      <ArrowRight aria-hidden className="size-3.5" />
    </Link>
  );
}
