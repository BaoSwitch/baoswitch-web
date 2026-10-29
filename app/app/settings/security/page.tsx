import type { Metadata } from "next";
import { Monitor, Smartphone } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, RailLink } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Checkbox, PasswordField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Security settings" };

const SESSIONS = [
  {
    device: "Chrome on Windows",
    detail: "Current session · Lagos, NG · Last active now",
    icon: Monitor,
    current: true,
  },
  {
    device: "Safari on iPhone",
    detail: "Demo session · Lagos, NG · 17 Oct, 6:40 PM WAT",
    icon: Smartphone,
    current: false,
  },
];

export default function SecuritySettingsPage() {
  return (
    <>
      <PageHeader
        back="Profile & account settings"
        backHref="/app/settings"
        title="Security settings"
        lead="Protect account access, payment authorisation and your signed-in devices."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Two-step verification" aside={<DemoChip>Not enabled</DemoChip>}>
              <p className="text-[13px] leading-relaxed text-muted">
                Set up two-step verification to select and verify an available method. No secret
                or recovery code is shown in this demo.
              </p>
              <div className="mt-4">
                <Button type="button" size="md">
                  Set up two-step verification
                </Button>
              </div>
            </Panel>

            <Notice title="Never share security secrets">
              Support will not ask for your password, transaction PIN, verification code or
              two-step recovery code.
            </Notice>

            <Panel title="Something looks unfamiliar?">
              <p className="text-[13px] leading-relaxed text-muted">
                Revoke a session you don&rsquo;t recognise, update your password, and contact
                in-app support if you suspect unauthorised access.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/support">Open security support</RailLink>
            </Panel>
          </>
        }
      >
        <Panel title="Change sign-in password">
          <form className="flex flex-col gap-4" action="/app/settings/security" method="get">
            <PasswordField label="Current password" name="current" autoComplete="current-password" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordField label="New password" name="password" autoComplete="new-password" minLength={8} required />
              <PasswordField label="Confirm new password" name="passwordConfirm" autoComplete="new-password" minLength={8} required />
            </div>
            <Checkbox
              name="signOutOthers"
              defaultChecked
              label="Sign out other devices after changing my password."
            />
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Update password
              </Button>
              <Button type="reset" variant="ghost" size="md" className="border-line2">
                Cancel
              </Button>
            </div>
          </form>
        </Panel>

        <Panel title="Transaction PIN" aside={<DemoChip>Set · digits never displayed</DemoChip>}>
          <p className="text-[14px] leading-relaxed text-muted">
            Your four-digit PIN authorises wallet payments. It is different from the password used
            to sign in.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button type="button" size="md">
              Change transaction PIN
            </Button>
            <Button type="button" variant="ghost" size="md" className="border-line2">
              Forgot / reset PIN
            </Button>
          </div>
        </Panel>

        <Panel title="Trusted devices & sessions">
          <ul className="flex flex-col gap-3">
            {SESSIONS.map((s) => (
              <li
                key={s.device}
                className="flex flex-wrap items-center gap-4 rounded-[var(--radius-field)] border border-line p-4"
              >
                <s.icon aria-hidden className="size-5 shrink-0 text-muted" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{s.device}</span>
                  <span className="block text-[13px] text-muted">{s.detail}</span>
                </span>
                {s.current ? (
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-medium text-primary-text">
                    This device
                  </span>
                ) : (
                  <Button type="button" variant="ghost" size="sm" className="border-line2">
                    Revoke
                  </Button>
                )}
              </li>
            ))}
          </ul>

          <Notice className="mt-4" tone="warning" title="Sign out of all other sessions?">
            This ends access on your other signed-in devices. You&rsquo;ll keep the current
            session unless you also choose to sign out here.
          </Notice>

          <div className="mt-4">
            <Button type="button" variant="ghost" size="md" className="border-line2">
              Review &amp; confirm sign out all
            </Button>
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
