import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthBrand, AuthCard, AuthFootnote } from "@/components/auth/auth-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/field";
import { Notice } from "@/components/app/ui";

export const metadata: Metadata = { title: "Set transaction PIN" };

export default function SetPinPage() {
  return (
    <AuthShell photo="/assets/photos/auth-signup.png" photoOpacity={0.3} brand={<AuthBrand />} backHref="/signup">
      <div className="flex flex-col gap-8">
        <AuthCard eyebrow="ACCOUNT SETUP · TRANSACTION SECURITY" title="Secure your payments">
          <form className="bs-raise flex flex-col gap-5" action="/api/auth/pin" method="post">
            <div className="grid gap-5 sm:grid-cols-2">
              <PasswordField
                label="Create transaction PIN"
                name="pin"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                autoComplete="new-password"
                required
                className="max-w-[16rem]"
              />
              <PasswordField
                label="Confirm transaction PIN"
                name="pinConfirm"
                inputMode="numeric"
                pattern="[0-9]{4}"
                maxLength={4}
                autoComplete="new-password"
                required
                className="max-w-[16rem]"
              />
            </div>
            <p className="text-[13px] text-primary-text">
              ✓ PINs match · Digits are masked for your privacy.
            </p>

            <Notice title="Not your login password">
              Choose a PIN that is hard to guess. Avoid repeated digits, your birth year or a
              simple sequence. Never send it in chat.
            </Notice>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Save PIN &amp; continue
              </Button>
              <ButtonLink href="/signup" variant="ghost" size="md" className="border-line2">
                Back to setup
              </ButtonLink>
            </div>
          </form>

          <Link
            href="/app/support"
            className="bs-raise inline-flex items-center gap-1 text-[15px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            Need help? Open in-app support
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </AuthCard>
        <AuthFootnote />
      </div>
    </AuthShell>
  );
}
