import { Band } from "@/components/marketing/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * The closing call to action.
 *
 * The frame puts its only two buttons in the hero and then runs for another
 * 5,400px — a reader who scrolls the FAQ to the end, which is exactly the
 * reader who has decided, is handed nothing but the footer. This band is the
 * second ask, placed where the argument finishes.
 */
export function ClosingCta() {
  return (
    <Band tone="raised" className="py-16 lg:py-24">
      <div className="bs-wrap">
        <Reveal className="bs-card bs-edge flex flex-col items-center gap-6 rounded-[var(--radius-tile)] px-6 py-14 text-center sm:px-12">
          <h2 className="bs-raise bs-h2 max-w-[24ch] text-primary-text">
            Fund your wallet once. Pay everything from it.
          </h2>
          <p className="bs-raise bs-lead max-w-[46ch] text-muted">
            Creating an account takes a phone number, an email and a transaction PIN. Nothing is
            charged until you choose a service.
          </p>
          <div className="bs-raise flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/pricing" variant="outline" size="lg">
              See what it costs
            </ButtonLink>
            <ButtonLink href="/signup" variant="primary" size="lg">
              Create a free account
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
