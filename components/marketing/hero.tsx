import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { DesignIcon } from "@/components/ui/design-icon";
import { Reveal } from "@/components/motion/reveal";
import { HERO_CHIPS } from "@/lib/content";

/**
 * Chip placement, as a fraction of the 787 x 608 art box in the Figma frame.
 * They are only absolutely positioned from `lg` up — below that there is no
 * room beside the portrait, so the same chips render as a wrapped row under
 * it and keep their job of listing what the product does.
 */
const CHIP_POS = [
  "lg:left-0 lg:top-[39.6%]", // Cable Subscriptions
  "lg:left-[72.1%] lg:top-[37.2%]", // Airtime
  "lg:left-[5.4%] lg:top-[62.9%]", // Electricity Bills
  "lg:left-[73.8%] lg:top-[61.3%]", // Data
  "lg:left-[4.7%] lg:top-[78.5%]", // Bulk SMS
  "lg:left-[74.5%] lg:top-[81%]", // Exam Pins
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-14 lg:pt-10 lg:pb-24">
      {/* The abstract sweep from the frame. It is 735px wide artwork stretched
          across a 1786px slab in the design, so it is pure atmosphere — it
          carries no meaning and is hidden from assistive tech. */}
      <Image
        src="/assets/photos/hero-abstract-bg.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 scale-110 object-cover opacity-70 dark:opacity-15"
      />
      <span aria-hidden className="bs-wash" />

      <div className="bs-wrap grid items-center gap-10 lg:grid-cols-[minmax(0,31rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        <Reveal className="flex flex-col gap-5">
          {/* The frame sets this as "All your Bills, One Blink Zero Stress" —
              three clauses with one comma between them, so it reads as a
              run-on. Same words, punctuated, and the line breaks become
              deliberate instead of a function of the column width. */}
          <h1 className="bs-h1 text-primary-text">
            All your bills.
            <br className="hidden sm:inline" /> One blink. Zero stress.
          </h1>
          <p className="bs-lead max-w-[29rem] text-muted">
            From airtime and data to electricity and TV subscriptions, BAOSWITCH DIGITAL
            SERVICES makes everyday payments simple, seamless, and convenient. Get everything
            done in one place and get back to what matters.
          </p>
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-4">
              {/* "Explore" and "Register" name neither a destination nor a
                  cost. Both labels now say what happens next. */}
              <ButtonLink href="#services" variant="outline" size="lg">
                See all services
              </ButtonLink>
              <ButtonLink href="/signup" variant="primary" size="lg">
                Create a free account
              </ButtonLink>
            </div>
            <p className="max-w-[40ch] text-sm text-muted">
              No card details needed to sign up — a phone number and an email is enough.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          {/* 787 x 608 in the frame — the ratio is held so the chip
              percentages stay true at every width. */}
          <div className="relative mx-auto w-full max-w-[49.2rem] lg:aspect-[787/608]">
            <div className="relative mx-auto w-[82%] max-w-[31.6rem] lg:absolute lg:left-[22.4%] lg:h-full lg:w-[64.3%] lg:max-w-none">
              {/* The frame crops a 2000x1333 cut-out into a 505.9 x 608 window:
                  the photo is laid in at 228.06% of the window's width, offset
                  -57.44% left and 0.3% down. Those are percentages of the
                  window, so the identical crop holds at every rendered size —
                  `object-cover` cannot express it, because the design zooms
                  ~1.27x past cover and is off-centre. */}
              <div className="relative aspect-[506/608] overflow-hidden rounded-tr-[var(--radius-hero)] rounded-bl-[var(--radius-hero)]">
                <Image
                  src="/assets/photos/hero-portrait.png"
                  alt="A BAOSWITCH customer paying a bill on her phone"
                  width={2000}
                  height={1333}
                  priority
                  sizes="(max-width: 1024px) 190vw, 76vw"
                  className="absolute max-w-none"
                  style={{ width: "228.06%", left: "-57.44%", top: "0.3%", height: "auto" }}
                />
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-2.5 lg:mt-0 lg:block">
              {HERO_CHIPS.map((chip, i) => (
                <li
                  key={chip.label}
                  style={{ animationDelay: `${i * 420}ms` }}
                  className={`bs-glass flex items-center gap-2 rounded-full px-4 py-2.5 whitespace-nowrap motion-safe:lg:animate-[bs-bob_6s_ease-in-out_infinite] lg:absolute lg:px-5 lg:py-3 ${CHIP_POS[i]}`}
                >
                  <DesignIcon art={chip.icon} className="size-5 lg:size-[26px]" />
                  <span className="text-[13px] font-medium text-primary-text lg:text-base">
                    {chip.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
