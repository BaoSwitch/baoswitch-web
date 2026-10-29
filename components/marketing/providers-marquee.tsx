"use client";

import Image from "next/image";
import { useInView } from "@/components/motion/use-in-view";
import { PROVIDERS } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * The supported-provider strip.
 *
 * The frame holds one 4556px row with the first few logos repeated at the end
 * — a static mock-up of a marquee. Here the list is rendered twice and the
 * track is translated by exactly -50%, so one copy scrolls off as the other
 * arrives and the loop never seams. The animation idles off screen, pauses on
 * hover and focus, and does not run at all under `prefers-reduced-motion`,
 * where the row simply becomes a horizontally scrollable list.
 *
 * `aria-hidden` on the duplicate keeps a screen reader from reading the whole
 * strip twice.
 */
export function ProvidersMarquee() {
  const [ref, inView] = useInView<HTMLDivElement>("300px");

  return (
    <section ref={ref} className="relative isolate py-14 lg:py-16">
      {/* The frame prints "Supported Providers" over a row of logos and
          leaves the reader to infer the claim. Saying it outright is the
          whole point of the strip. */}
      <div className="bs-wrap mb-9 flex flex-col items-center gap-2 text-center">
        <h2 className="text-lg font-semibold text-primary-text">Supported providers</h2>
        <p className="max-w-[46ch] text-[15px] text-muted">
          Every network, DisCo, TV package and exam board below is paid directly from your
          BAOSWITCH wallet.
        </p>
      </div>

      {/* With motion allowed this is a masked, overflowing strip the track
          slides through. Under `prefers-reduced-motion` the track never
          moves, so the mask would leave the first logo permanently half
          faded — there it becomes an ordinary horizontal scroller instead. */}
      <div className="bs-marquee bs-fade-x overflow-hidden motion-reduce:overflow-x-auto motion-reduce:px-4 motion-reduce:[mask-image:none] motion-reduce:[-webkit-mask-image:none]">
        <div
          className="bs-marquee-track gap-12 lg:gap-20"
          data-play={inView ? "on" : "off"}
          style={{ ["--bs-marquee-dur" as string]: "52s" }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-center gap-12 lg:gap-20"
            >
              {PROVIDERS.map((p) => (
                <li
                  key={p.name}
                  className={cn(
                    "flex h-20 shrink-0 items-center justify-center lg:h-24",
                    p.tint && "rounded-[var(--radius-chip)] bg-accent px-6 dark:bg-white/10",
                  )}
                >
                  <Image
                    src={p.src}
                    alt={copy === 0 ? p.name : ""}
                    width={p.w}
                    height={p.h}
                    className="h-full w-auto max-w-none object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
