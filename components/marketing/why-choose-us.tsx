import { Band, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/motion/reveal";
import { REASONS } from "@/lib/content";

/**
 * Six reasons on pill-shaped cards.
 *
 * The frame numbers them 1,2,3,3,4,5 — a copy slip. The numerals come from
 * the list index here so they cannot drift again, and the marker is drawn as
 * a counter badge rather than a decimal `list-style`, which lets the number
 * sit on the same baseline as the title at any width.
 */
export function WhyChooseUs() {
  return (
    <Band className="py-20 lg:py-28">
      <div className="bs-wrap flex flex-col items-center gap-12 lg:gap-16">
        <Reveal>
          <SectionHeading align="center" title="Why choose us?" />
        </Reveal>

        <ol className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {REASONS.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={(i % 3) * 90}>
              <div className="bs-card bs-edge bs-lift flex h-full gap-4 rounded-[2.5rem] px-7 py-7">
                <span
                  aria-hidden
                  className="bs-raise mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-text"
                >
                  {i + 1}
                </span>
                <div className="bs-raise flex min-w-0 flex-col gap-1.5">
                  <h3 className="text-lg font-semibold text-primary-text">{reason.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{reason.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Band>
  );
}
