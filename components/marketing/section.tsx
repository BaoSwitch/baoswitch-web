import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section furniture shared by every marketing block.
 *
 * The Figma frames are eight white slabs stacked on each other. `<Band>` gives
 * the page alternating contrast and a colour wash for the glass cards to blur
 * against; `<SectionHeading>` fixes one title/lead rhythm so the sections stop
 * each inventing their own.
 */

export function Band({
  tone = "flat",
  wash = true,
  className,
  children,
  ...rest
}: {
  tone?: "flat" | "raised" | "primary";
  /** The radial colour wash. Off for bands that carry their own artwork. */
  wash?: boolean;
} & ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate",
        tone === "raised" && "bs-band",
        tone === "primary" && "bg-primary text-white",
        className,
      )}
      {...rest}
    >
      {wash && tone !== "primary" ? <span aria-hidden className="bs-wash" /> : null}
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  lead,
  id,
  align = "start",
  tone = "brand",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "start" | "center";
  /** `onPrimary` is the white-on-green treatment inside a primary band. */
  tone?: "brand" | "onPrimary";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2
        id={id}
        className={cn("bs-h2", tone === "onPrimary" ? "text-white" : "text-primary-text")}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "bs-lead",
            tone === "onPrimary" ? "text-white/90" : "text-muted",
            align === "center" ? "max-w-[46rem]" : "max-w-[42rem]",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
