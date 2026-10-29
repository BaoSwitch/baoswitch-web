import type { ReactNode } from "react";
import { DesignIcon, type IconArt } from "@/components/ui/design-icon";
import { BrandCheck } from "@/components/auth/auth-shell";

/** The four white symbol tiles the auth brand panel shows. */
const SYMBOLS: IconArt[] = [
  { src: "/assets/icons/sym-smartphone.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-wifi.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-zap.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-tv.svg", w: 26, h: 26, slot: 26 },
];

/**
 * The brand panel shared by every account-access screen.
 *
 * The frames head it "Bills in A Blink" on one screen and "All Bills in A
 * Blink" on the next three; it is the same panel, so it gets the one
 * heading, matching the wordmark's own strapline.
 */
export function AuthBrand() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex gap-4">
        {SYMBOLS.map((art) => (
          <li
            key={art.src}
            className="flex size-[3.875rem] items-center justify-center rounded-2xl bg-white"
          >
            <DesignIcon art={art} className="size-[26px]" />
          </li>
        ))}
      </ul>
      <h2 className="text-[clamp(1.75rem,1.1rem+1.9vw,2.375rem)] leading-[1.3] font-semibold">
        Bills in a blink
      </h2>
      <p className="text-[clamp(1rem,0.9rem+0.3vw,1.25rem)] leading-[1.7] text-white/90">
        Pay your everyday bills, manage your wallet and make room for what matters.
      </p>
      <span aria-hidden className="h-[5px] w-16 rounded-[3px] bg-secondary" />
      <ul className="flex flex-col gap-4 text-[clamp(1rem,0.9rem+0.3vw,1.25rem)]">
        <BrandCheck>Airtime, data &amp; household bills</BrandCheck>
        <BrandCheck>One place to track every payment</BrandCheck>
        <BrandCheck>Laundry, architecture &amp; more</BrandCheck>
      </ul>
    </div>
  );
}

/** The bordered form card on the right-hand panel. */
export function AuthCard({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bs-card bs-edge flex flex-col gap-5 rounded-[var(--radius-card)] p-6 sm:p-9">
      <div className="bs-raise flex flex-col gap-2">
        <p className="text-sm font-semibold tracking-wide text-primary-text">{eyebrow}</p>
        <h1 className="text-[clamp(1.5rem,1.1rem+1.1vw,1.75rem)] leading-[1.4] font-semibold text-primary-text">
          {title}
        </h1>
        {lead ? <p className="text-[15px] leading-[1.5] text-muted">{lead}</p> : null}
      </div>
      {children}
    </div>
  );
}

/** The standing privacy line under every account-access card. */
export function AuthFootnote() {
  return (
    <p className="text-[15px] leading-[1.6] text-muted">
      Your password, verification codes and transaction PIN are private. Never share them with
      anyone, including support.
    </p>
  );
}
