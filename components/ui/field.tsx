"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A labelled text input.
 *
 * The frames draw the label, the border and the placeholder as three separate
 * layers with no association between them. Here the label is a real `<label>`
 * bound to the input, so tapping it focuses the field and a screen reader
 * announces the two together. `hint` is wired through `aria-describedby`
 * rather than left as loose text beside the field.
 */
export function Field({
  label,
  hint,
  action,
  className,
  id,
  ...rest
}: {
  label: ReactNode;
  hint?: ReactNode;
  /** Trailing control on the label row, e.g. "Forgot password?". */
  action?: ReactNode;
  className?: string;
} & ComponentProps<"input">) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={inputId} className="text-[15px] font-medium text-primary-text">
          {label}
        </label>
        {action}
      </div>
      <input
        id={inputId}
        aria-describedby={hintId}
        className="h-14 w-full rounded-[var(--radius-field)] border border-primary/60 bg-surface px-5 text-[15px] text-ink transition-colors placeholder:text-muted/60 hover:border-primary focus-visible:border-primary"
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * A password field with a show/hide toggle.
 *
 * The frame supplies only the struck-through eye, i.e. one of the two states
 * this control has. Rather than ship a static icon that lies about what the
 * button does, the toggle uses the matching pair from the icon set already in
 * the project and flips `aria-pressed` with it.
 */
export function PasswordField({
  label,
  hint,
  action,
  className,
  id,
  ...rest
}: {
  label: ReactNode;
  hint?: ReactNode;
  action?: ReactNode;
  className?: string;
} & ComponentProps<"input">) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const [shown, setShown] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={inputId} className="text-[15px] font-medium text-primary-text">
          {label}
        </label>
        {action}
      </div>
      <div className="relative">
        <input
          id={inputId}
          type={shown ? "text" : "password"}
          aria-describedby={hintId}
          className="h-14 w-full rounded-[var(--radius-field)] border border-primary/60 bg-surface pr-14 pl-5 text-[15px] text-ink transition-colors placeholder:text-muted/60 hover:border-primary focus-visible:border-primary"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-pressed={shown}
          aria-controls={inputId}
          aria-label={shown ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-ink"
        >
          {shown ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      {hint ? (
        <p id={hintId} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Checkbox with the label as its own control, not text sitting beside one. */
export function Checkbox({
  label,
  className,
  id,
  ...rest
}: { label: ReactNode; className?: string } & ComponentProps<"input">) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={inputId}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--bs-primary)]"
        {...rest}
      />
      <label htmlFor={inputId} className="cursor-pointer text-[15px] leading-relaxed text-muted">
        {label}
      </label>
    </div>
  );
}
