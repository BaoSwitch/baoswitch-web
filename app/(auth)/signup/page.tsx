import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, BrandCheck } from "@/components/auth/auth-shell";
import { Button, ButtonLink } from "@/components/ui/button";
import { Checkbox, Field, PasswordField } from "@/components/ui/field";
import { DesignIcon } from "@/components/ui/design-icon";
import type { IconArt } from "@/components/ui/design-icon";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a BAOSWITCH account and pay airtime, data, electricity and TV bills from one wallet.",
};

/** The four white symbol tiles in the brand panel, 26px glyphs in 62px tiles. */
const SYMBOLS: IconArt[] = [
  { src: "/assets/icons/sym-smartphone.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-wifi.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-zap.svg", w: 26, h: 26, slot: 26 },
  { src: "/assets/icons/sym-tv.svg", w: 26, h: 26, slot: 26 },
];

export default function SignupPage() {
  return (
    <AuthShell
      photo="/assets/photos/auth-signup.png"
      photoOpacity={0.3}
      brand={
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
          <h1 className="text-[clamp(1.75rem,1.1rem+1.9vw,2.375rem)] leading-[1.3] font-semibold">
            Bills in a blink
          </h1>
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
      }
    >
      <div className="flex flex-col gap-8">
        <form
          className="bs-card bs-edge flex flex-col gap-5 rounded-[var(--radius-card)] p-6 sm:p-9"
          action="/api/auth/signup"
          method="post"
        >
          <div className="bs-raise flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-wide text-primary-text">
              ACCOUNT ACCESS · GET STARTED
            </p>
            <h1 className="text-[clamp(1.5rem,1.1rem+1.1vw,1.75rem)] leading-[1.4] font-semibold text-primary-text">
              Create your account
            </h1>
            {/* The frame sets this line in white on a white card, i.e.
                invisible. It reads as the muted sub-line it clearly is. */}
            <p className="text-[15px] leading-[1.5] text-muted">
              Your everyday essentials, together in one workspace.
            </p>
          </div>

          <div className="bs-raise flex flex-col gap-4">
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              placeholder="Ada Okafor"
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="ada.okafor@example.com"
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+234 803 000 4421"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordField
                label="Password"
                name="password"
                autoComplete="new-password"
                required
                minLength={8}
              />
              <PasswordField
                label="Confirm password"
                name="passwordConfirm"
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
          </div>

          <ul className="bs-raise flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-primary-text">
            <li>✓ At least 8 characters</li>
            <li>✓ Upper &amp; lowercase</li>
            <li>✓ A number or symbol</li>
          </ul>

          <Checkbox
            className="bs-raise"
            name="terms"
            required
            label={
              <>
                I agree to the{" "}
                <Link href="/terms" className="text-primary-text underline-offset-4 hover:underline">
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary-text underline-offset-4 hover:underline">
                  Privacy notice
                </Link>
                .
              </>
            }
          />

          <div className="bs-raise flex flex-wrap items-center gap-3 pt-1.5">
            <Button type="submit" size="md">
              Create account
            </Button>
            <ButtonLink href="/login" variant="ghost" size="md" className="border-line2">
              Sign in instead
            </ButtonLink>
          </div>

          <p className="bs-raise text-[15px] leading-[1.5] text-muted">
            We&rsquo;ll ask you to verify your contact before finishing setup.
          </p>
        </form>

        <p className="text-[15px] leading-[1.6] text-muted">
          Your password, verification codes and transaction PIN are private. Never share them with
          anyone, including support.
        </p>
      </div>
    </AuthShell>
  );
}
