import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthBrand, AuthCard, AuthFootnote } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Notice } from "@/components/app/ui";
import { USER } from "@/lib/app-data";

export const metadata: Metadata = { title: "Verify contact" };

export default function VerifyContactPage() {
  return (
    <AuthShell photo="/assets/photos/auth-signup.png" photoOpacity={0.3} brand={<AuthBrand />} backHref="/signup">
      <div className="flex flex-col gap-8">
        <AuthCard
          eyebrow="ACCOUNT ACCESS · VERIFY CONTACT"
          title="Check your messages"
          lead={`Enter the six-digit code sent to ${USER.phone}.`}
        >
          <p className="bs-raise">
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[13px] font-medium text-white">
              Phone verification
            </span>
          </p>

          <form className="bs-raise flex flex-col gap-5" action="/api/auth/verify" method="post">
            {/* `one-time-code` lets a phone offer the SMS code straight from
                the keyboard, and the numeric mode avoids a letter keypad. */}
            <Field
              label="Verification code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              placeholder="● ● ● ● ● ●"
              hint="Use the most recent code."
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Verify contact
              </Button>
              <ButtonLink href="/signup" variant="ghost" size="md" className="border-line2">
                Back to account setup
              </ButtonLink>
            </div>
          </form>

          <hr className="bs-raise bs-rule" />

          <Link
            href="/signup"
            className="bs-raise inline-flex items-center gap-1 text-[15px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            Wrong number? Change contact
            <ArrowRight aria-hidden className="size-4" />
          </Link>

          <Notice className="bs-raise" title="Keep this code private">
            BAOSWITCH support will never ask for your verification code. If you didn&rsquo;t request
            it, return to sign in.
          </Notice>
        </AuthCard>
        <AuthFootnote />
      </div>
    </AuthShell>
  );
}
