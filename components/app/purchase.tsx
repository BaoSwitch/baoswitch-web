import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Panel, DetailRow } from "@/components/app/ui";
import { money } from "@/lib/app-data";
import { cn } from "@/lib/cn";

/**
 * A set of choices rendered as real radio inputs inside a `<fieldset>`.
 *
 * The frames draw these as styled dots, which look like radios but say
 * nothing to assistive tech and cannot be driven from the keyboard. These
 * are the native control with the dot drawn on top, so arrow keys move
 * between options and the group announces its legend.
 */
export function ChoiceGroup({
  legend,
  hint,
  name,
  options,
  defaultValue,
  className,
}: {
  legend: ReactNode;
  hint?: ReactNode;
  name: string;
  options: readonly string[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <fieldset className={cn("rounded-[var(--radius-field)] border border-line p-4", className)}>
      <legend className="px-1 text-[13px] font-medium text-muted">{legend}</legend>
      <div className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
        {options.map((option) => (
          <label key={option} className="inline-flex cursor-pointer items-center gap-2 text-[15px] text-ink">
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={option === defaultValue}
              className="size-4 accent-[var(--bs-primary)]"
            />
            {option}
          </label>
        ))}
      </div>
      {hint ? <p className="mt-2 text-[12px] text-muted">{hint}</p> : null}
    </fieldset>
  );
}

/** A selectable row — a data bundle, a package. Radio, card-shaped. */
export function ChoiceCard({
  name,
  value,
  defaultChecked,
  title,
  detail,
  price,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  title: ReactNode;
  detail?: ReactNode;
  price?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-[var(--radius-field)] border border-line p-4 transition-colors hover:border-line2 has-checked:border-primary has-checked:bg-primary-soft">
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="size-4 shrink-0 accent-[var(--bs-primary)]"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-primary-text">{title}</span>
        {detail ? <span className="block text-[13px] text-muted">{detail}</span> : null}
      </span>
      {price !== undefined ? (
        <span className="num shrink-0 font-semibold whitespace-nowrap text-ink">
          {money(price)}
        </span>
      ) : null}
    </label>
  );
}

/** The green "we checked this, illustratively" confirmation the forms show. */
export function ValidatedNote({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-[var(--radius-field)] border border-primary/20 bg-primary-soft p-4 text-primary-text">
      <CheckCircle2 aria-hidden className="mt-0.5 size-[18px] shrink-0" />
      <p className="text-[13px] leading-relaxed">
        <span className="font-semibold">{title}</span>
        <br />
        {children}
      </p>
    </div>
  );
}

/**
 * The payment summary rail.
 *
 * `lines` are the itemised rows and `total` is the figure the button will
 * charge; they are passed separately so the total can never drift out of
 * step with a line that was edited above it.
 */
export function PaymentSummary({
  service,
  amount,
  fee = 0,
  total,
  lines,
  footnote,
}: {
  service: ReactNode;
  amount: number;
  fee?: number;
  total: number;
  lines?: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <Panel title="Payment summary">
      <dl>
        <DetailRow label="Service" value={service} />
        <DetailRow label="Amount" value={money(amount)} />
        <DetailRow label="Demo service fee" value={money(fee)} />
        {lines}
        <div className="mt-2 border-t border-line pt-2">
          <DetailRow label="Total" value={money(total)} strong />
        </div>
      </dl>
      <p className="mt-3 text-[12px] leading-relaxed text-muted">
        {footnote ?? "Example pricing only. Review the final amount before authorising."}
      </p>
    </Panel>
  );
}
