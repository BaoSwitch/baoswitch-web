import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthBrand, AuthCard, AuthFootnote } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Checkbox, PasswordField } from "@/components/ui/field";
import { Notice } from "@/components/app/ui";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <AuthShell photo="/assets/photos/auth-signup.png" photoOpacity={0.3} brand={<AuthBrand />} backHref="/login">
      <div className="flex flex-col gap-8">
        <AuthCard
          eyebrow="ACCOUNT ACCESS · RESET PASSWORD"
          title="Choose a new password"
          lead="Use a unique password that you don’t use on another service."
        >
          <form className="bs-raise flex flex-col gap-5" action="/api/auth/reset" method="post">
            <PasswordField
              label="New password"
              name="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <PasswordField
              label="Confirm new password"
              name="passwordConfirm"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-primary-text">
              <li>✓ At least 8 characters</li>
              <li>✓ Upper &amp; lowercase</li>
              <li>✓ A number or symbol</li>
            </ul>
            <Checkbox
              name="signOutOthers"
              defaultChecked
              label="Sign out other sessions after updating my password."
            />

            {/* The two secrets are routinely confused, and confusing them is
                how someone ends up typing a sign-in password into a payment
                prompt. The card says which is which, here, at the moment one
                of them is being set. */}
            <Notice title="Separate from your transaction PIN">
              This password signs you in. Your four-digit transaction PIN authorises wallet
              payments.
            </Notice>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Update password
              </Button>
              <ButtonLink href="/login" variant="ghost" size="md" className="border-line2">
                Return to sign in
              </ButtonLink>
            </div>
          </form>

          <Link
            href="/forgot-password"
            className="bs-raise inline-flex items-center gap-1 text-[15px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            Reset link expired? Request new instructions
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </AuthCard>
        <AuthFootnote />
      </div>
    </AuthShell>
  );
}
