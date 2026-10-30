import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE_TAGLINE } from "@/lib/site";

/**
 * The BAOSWITCH lockup: the B/lightning mark, the "AOSWITCH" wordmark it
 * doubles as the B of, the tracked-out "DIGITAL SERVICES" line and the
 * tagline tucked under its right edge.
 *
 * `tone="light"` is the footer treatment — white type with the white mark.
 * The three pieces are positioned relative to the mark's height so one
 * `size` prop scales the whole lockup.
 */
export function Logo({
  tone = "brand",
  className,
  priority,
}: {
  tone?: "brand" | "light";
  className?: string;
  priority?: boolean;
}) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      aria-label="BAOSWITCH Digital Services — home"
      className={cn("group inline-flex w-fit shrink-0 flex-col gap-0 self-start", className)}
    >
      <span className="flex items-center gap-[0.04em]">
        <Image
          src={light ? "/assets/brand/baoswitch-bolt-light.svg" : "/assets/brand/baoswitch-bolt.svg"}
          alt=""
          width={19}
          height={23}
          priority={priority}
          className="h-[0.8em] w-auto transition-transform duration-300 group-hover:-translate-y-px"
          style={{ fontSize: "inherit" }}
        />
        <span
          className={cn(
            "font-display text-[1em] leading-none font-extrabold tracking-[-0.01em]",
            light ? "text-white" : "text-primary",
          )}
        >
          AOSWITCH
        </span>
      </span>
      <span className="flex items-baseline justify-between pl-[0.42em]">
        <span
          className={cn(
            "text-[0.33em] leading-tight font-medium tracking-[0.3em]",
            light ? "text-white" : "text-secondary",
          )}
        >
          DIGITAL SERVICES
        </span>
      </span>
      <span
        className={cn(
          "pr-[0.1em] text-right text-[0.17em] leading-tight font-light",
          light ? "text-white/90" : "text-primary-text/90",
        )}
      >
        {SITE_TAGLINE}
      </span>
    </Link>
  );
}
