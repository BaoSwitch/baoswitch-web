import { Plus } from "lucide-react";
import { Band, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/motion/reveal";
import { FAQS } from "@/lib/content";

/**
 * The FAQ accordion.
 *
 * Built on native `<details>`/`<summary>` rather than React state: it opens
 * without JavaScript, is keyboard-operable and announced correctly for free,
 * and browser find-in-page can reach the answers. The `+` rotates into an `x`
 * through `group-open`, which replaces the two crossed strokes the frame
 * draws by hand.
 *
 * The frame gives the bars square corners; they get the system's radius here
 * so they sit in the same language as the 40px service tiles.
 */
export function FaqSection() {
  return (
    <Band id="faqs" className="scroll-mt-28 py-20 lg:py-28">
      <div className="bs-wrap flex flex-col gap-12 lg:gap-16">
        <Reveal>
          <SectionHeading title="Frequently asked questions" />
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i, 4) * 70}>
              <details className="group overflow-hidden rounded-[var(--radius-field)] bg-primary text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_8px_20px_-14px_var(--bs-primary)] transition-shadow duration-300 open:shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_16px_36px_-18px_var(--bs-primary)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden lg:px-10 lg:py-6 lg:text-xl">
                  {faq.q}
                  <Plus
                    aria-hidden
                    className="size-6 shrink-0 transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-pretty text-white/90 lg:px-10 lg:pb-8 lg:text-base">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}
