import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "secondary" | "light" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border font-medium whitespace-nowrap transition-[filter,background-color,border-color,box-shadow,translate] duration-200 disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:cursor-not-allowed aria-disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  // One hairline highlight plus a tinted cast reads as lift without a glow.
  primary:
    "border-transparent bg-primary text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_6px_18px_-8px_var(--bs-primary)] hover:brightness-105 active:translate-y-px",
  outline:
    "border-primary text-primary-text hover:bg-primary-soft active:translate-y-px",
  secondary:
    "border-transparent bg-secondary text-on-secondary shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_6px_18px_-8px_var(--bs-secondary)] hover:brightness-105 active:translate-y-px",
  light: "border-transparent bg-white text-accent hover:bg-primary-soft",
  ghost: "border-transparent text-ink hover:bg-surface2",
};

/** `lg` lands on 48px so the primary calls to action stay a comfortable
 *  thumb target; `sm` and `md` sit below that and well clear of 24px. */
const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-[13px]",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-[15px]",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

function classes({ variant = "primary", size = "md", className }: SharedProps) {
  return cn(base, variants[variant], sizes[size], "[&_svg]:size-[18px] [&_svg]:shrink-0", className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: SharedProps & ComponentProps<"button">) {
  return <button type={type} className={classes({ variant, size, className })} {...rest} />;
}

/** A link styled as a button — keeps `<a>` semantics so the router's
 *  prefetching still applies. */
export function ButtonLink({
  variant,
  size,
  className,
  ...rest
}: SharedProps & ComponentProps<typeof Link>) {
  return <Link className={classes({ variant, size, className })} {...rest} />;
}
