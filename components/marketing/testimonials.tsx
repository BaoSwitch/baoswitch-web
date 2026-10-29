import Image from "next/image";
import { Band, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/motion/reveal";
import { DesignIcon } from "@/components/ui/design-icon";
import { STAR_ART, TESTIMONIALS } from "@/lib/content";

/** The filled star from the design, repeated `rating` times. */
function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-1 pt-0.5">
      <span className="sr-only">{rating} out of 5 stars</span>
      {Array.from({ length: 5 }, (_, i) => (
        <DesignIcon
          key={i}
          art={STAR_ART}
          className={i < rating ? "size-4" : "size-4 opacity-20 grayscale"}
        />
      ))}
    </p>
  );
}

export function Testimonials() {
  return (
    <Band tone="raised" className="py-20 lg:py-28">
      <div className="bs-wrap flex flex-col items-center gap-12 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="center"
            title="Testimonials"
            lead="What people use BAOSWITCH for, in their own words."
          />
        </Reveal>

        <ul className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {TESTIMONIALS.map((person, i) => (
            <Reveal as="li" key={person.name} delay={i * 110}>
              <figure className="bs-card bs-edge bs-lift flex h-full flex-col gap-6 rounded-[var(--radius-step)] p-7">
                <figcaption className="bs-raise flex items-start gap-4">
                  <Image
                    src={person.avatar}
                    alt=""
                    width={70}
                    height={70}
                    className="size-[4.375rem] shrink-0 rounded-full object-cover"
                  />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-lg font-bold text-primary-text">
                      {person.name}
                    </span>
                    <span className="truncate text-sm text-muted">{person.role}</span>
                    {/* The frame strands the stars in the bottom-right corner,
                        so the quote is read before the score it belongs to.
                        Here the rating sits with the attribution: who, how
                        they rated, then what they said. */}
                    <Stars rating={person.rating} />
                  </span>
                </figcaption>
                <blockquote className="bs-raise mt-auto text-[15px] leading-relaxed text-pretty text-muted">
                  {person.quote}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </Band>
  );
}
