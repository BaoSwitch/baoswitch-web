import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Status is never colour alone: every pill carries an icon and a word, so it
 * survives colour-blindness, greyscale print and forced-colors. These tokens
 * are reserved for state and are never reused as a chart series colour.
 */
export type PaymentStatus = "successful" | "pending" | "failed";

const PAYMENT = {
  successful: { label: "Successful", icon: CheckCircle2, className: "bg-success-soft text-success" },
  pending: { label: "Pending", icon: Clock, className: "bg-warning-soft text-warning" },
  failed: { label: "Failed", icon: XCircle, className: "bg-error-soft text-error" },
} as const;

export function StatusPill({
  status,
  label,
  className,
}: {
  status: PaymentStatus;
  /** Overrides the default word, e.g. "Failed · Not charged". */
  label?: string;
  className?: string;
}) {
  const s = PAYMENT[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium whitespace-nowrap",
        s.className,
        className,
      )}
    >
      <s.icon aria-hidden className="size-3.5 shrink-0" />
      {label ?? s.label}
    </span>
  );
}

export type ServiceState = "operational" | "degraded" | "down";

const SERVICE = {
  operational: { label: "Operational", icon: CheckCircle2, className: "text-success" },
  degraded: { label: "Degraded", icon: AlertTriangle, className: "text-warning" },
  down: { label: "Down", icon: XCircle, className: "text-error" },
} as const;

export function ServiceStatus({ state }: { state: ServiceState }) {
  const s = SERVICE[state];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[13px] font-medium", s.className)}>
      <s.icon aria-hidden className="size-3.5" />
      {s.label}
    </span>
  );
}

/** A neutral "this is demo data" chip, used wherever the frames flag one. */
export function DemoChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-warning-soft px-2.5 py-1 text-[12px] font-medium text-warning">
      {children}
    </span>
  );
}
