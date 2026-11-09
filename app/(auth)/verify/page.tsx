import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthBrand, AuthCard, AuthFootnote } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Notice } from "@/components/app/ui";
import { authMessage } from "@/lib/auth-errors";
import { getPending } from "@/lib/server/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Verify contact" };

export default async function VerifyContactPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const pending = await getPending();
  if (!pending) redirect("/login?e=NO_PENDING");
  const error = authMessage((await searchParams).e);
  const where = pending.sent_to ?? "your email";
  const back = pending.kind === "signup" ? "/signup" : "/login";
  return (
    <AuthShell photo="/assets/photos/auth-signup.png" photoOpacity={0.3} brand={<AuthBrand />} backHref={back}>
      <div className="flex flex-col gap-8">
        <AuthCard
          eyebrow="ACCOUNT ACCESS · VERIFY CONTACT"
          title="Check your messages"
          lead={`Enter the six-digit code sent to ${where}.`}
        >
          <p className="bs-raise">
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[13px] font-medium text-white">
              {pending.kind === "signup" ? "Email verification" : "New device check"}
            </span>
          </p>

          <form className="bs-raise flex flex-col gap-5" action="/api/auth/verify" method="post">
            {error ? <Notice tone="error">{error}</Notice> : null}
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
              <ButtonLink href={back} variant="ghost" size="md" className="border-line2">
                {pending.kind === "signup" ? "Back to account setup" : "Back to sign in"}
              </ButtonLink>
            </div>
          </form>

          <hr className="bs-raise bs-rule" />

          <Link
            href={back}
            className="bs-raise inline-flex items-center gap-1 text-[15px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            {pending.kind === "signup" ? "Wrong email? Change contact" : "Use a different account"}
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
