import Image from "next/image";
import { Band, SectionHeading } from "@/components/marketing/section";
import { DesignIcon } from "@/components/ui/design-icon";
import { Reveal } from "@/components/motion/reveal";
import { STEPS } from "@/lib/content";

/**
 * The green band: three outlined cards, each with a numbered badge straddling
 * its top edge. The badge is an `<img>` of the rendered 3D numeral from the
 * design rather than a styled circle, so the numerals keep their bevel.
 *
 * An ordered list carries the "three steps" meaning to a screen reader; the
 * badges themselves are decorative.
 */
export function HowItWorks() {
  return (
    <Band
      id="how-it-works"
      tone="primary"
      className="scroll-mt-28 overflow-hidden py-20 lg:py-28"
    >
      <div className="bs-wrap flex flex-col items-center gap-14 lg:gap-20">
        <Reveal>
          <SectionHeading
            align="center"
            tone="onPrimary"
            title="How BAOSWITCH works"
            lead="Three steps, less stress."
          />
        </Reveal>

        <ol className="grid w-full gap-14 sm:gap-10 md:grid-cols-3 lg:gap-16">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="relative pt-10">
              <Image
                src={step.badge}
                alt=""
                aria-hidden
                width={80}
                height={80}
                className="absolute top-0 left-1/2 size-20 -translate-x-1/2 drop-shadow-[0_6px_12px_rgb(0_0_0/0.25)]"
              />
              <div className="flex h-full flex-col items-center gap-5 rounded-[var(--radius-step)] border-2 border-white/70 bg-white/5 px-6 pt-12 pb-9 text-center backdrop-blur-[2px]">
                <DesignIcon art={step.icon} className="size-16" />
                <h3 className="text-xl font-semibold tracking-wide text-white uppercase">
                  {step.title}
                </h3>
                <p className="max-w-[20rem] leading-relaxed text-white/90">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Band>
  );
}
