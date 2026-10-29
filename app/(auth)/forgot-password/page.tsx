import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthBrand, AuthCard, AuthFootnote } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Notice } from "@/components/app/ui";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell photo="/assets/photos/auth-signup.png" photoOpacity={0.3} brand={<AuthBrand />} backHref="/login">
      <div className="flex flex-col gap-8">
        <AuthCard eyebrow="ACCOUNT ACCESS · RECOVERY" title="Let’s get you back in">
          <form className="bs-raise flex flex-col gap-5" action="/api/auth/recover" method="post">
            <Field
              label="Email or phone number"
              name="identifier"
              autoComplete="username"
              required
              placeholder="ada.okafor@example.com"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Send reset instructions
              </Button>
              <ButtonLink href="/login" variant="ghost" size="md" className="border-line2">
                Back to sign in
              </ButtonLink>
            </div>
          </form>

          <Notice className="bs-raise" title="What happens next">
            If an account matches, reset instructions will be sent to its registered contact. Check
            your inbox and spam folder, or your messages.
          </Notice>

          {/* Saying this out loud is the point: the response is deliberately
              identical whether or not the account exists, so nobody can use
              this form to discover who has an account. */}
          <p className="bs-raise text-[15px] text-muted">
            For your privacy, we don&rsquo;t reveal whether a contact has an account.
          </p>

          <Link
            href="/app/support"
            className="bs-raise inline-flex items-center gap-1 text-[15px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            No longer have access to your contact? In-app support
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </AuthCard>
        <AuthFootnote />
      </div>
    </AuthShell>
  );
}
