import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, RailLink } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Button, ButtonLink } from "@/components/ui/button";
import { USER } from "@/lib/app-data";

export const metadata: Metadata = { title: "Profile & account settings" };

const PREFERENCES = [
  { label: "Profile information", href: "/app/settings" },
  { label: "Security settings", href: "/app/settings/security" },
  { label: "Notifications & preferences", href: "/app/settings/notifications" },
  { label: "Identity verification", href: "/app/settings/identity" },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        back="Overview"
        backHref="/app"
        title="Profile & account settings"
        lead="Manage your details, preferences and the information you share."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Account preferences">
              <ul className="flex flex-col">
                {PREFERENCES.map((p) => (
                  <li key={p.label} className="border-b border-line last:border-0">
                    <Link
                      href={p.href}
                      className="flex items-center justify-between gap-3 py-3 text-[14px] text-ink transition-colors hover:text-primary-text"
                    >
                      {p.label}
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Verification status" aside={<DemoChip>Verified · demo profile</DemoChip>}>
              <p className="text-[13px] leading-relaxed text-muted">
                Your main dashboard profile is verified in this demonstration. The onboarding
                verification screen separately illustrates a pending-review state.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/settings/identity">View verification information</RailLink>
            </Panel>

            <Notice title="Keep your details current">
              An up-to-date contact helps you receive payment, funding and support updates.
            </Notice>
          </>
        }
      >
        <Panel title="Personal information">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary-text"
              >
                {USER.initials}
              </span>
              <span className="text-xl font-semibold text-primary-text">{USER.name}</span>
            </p>
            <span className="inline-flex items-center rounded-full bg-success-soft px-3 py-1 text-[12px] font-medium text-success">
              Verified account
            </span>
          </div>

          <form className="mt-5 flex flex-col gap-4" action="/app/settings" method="get">
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox label="First name" value={USER.firstName} />
              <FieldBox label="Last name" value={USER.lastName} />
            </dl>
            <dl className="contents">
              <FieldBox
                label="Account type"
                value={USER.accountType}
                hint="Changes to legal identity details may require a new review."
              />
            </dl>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Save profile changes
              </Button>
              <Button type="reset" variant="ghost" size="md" className="border-line2">
                Cancel changes
              </Button>
            </div>
          </form>
        </Panel>

        <Panel title="Contact details">
          <dl className="grid gap-4 sm:grid-cols-2">
            <FieldBox
              label="Email address"
              value={USER.email}
              hint="Verified contact · demo email"
            />
            <FieldBox label="Phone number" value={USER.phone} />
          </dl>
          <Notice className="mt-4" title="Contact changes need verification">
            When you change a contact, you&rsquo;ll be asked to verify the new email or phone
            number before it replaces your current one.
          </Notice>
          <div className="mt-4">
            <ButtonLink href="/verify" variant="ghost" size="md" className="border-line2">
              Edit contact details
            </ButtonLink>
          </div>
        </Panel>

        <Panel title="Privacy & account data">
          <dl className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
              <dt className="text-[14px] text-ink">Your account data</dt>
              <dd>
                <RailLink href="/app/support">Request a copy</RailLink>
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
              <dt className="text-[14px] text-ink">Privacy notice</dt>
              <dd>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
                >
                  View privacy information
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </Link>
              </dd>
            </div>
          </dl>

          {/* Closing an account is irreversible and can strand held funds, so
              it is set apart in the error tone and routed through a review
              step rather than offered as a button here. */}
          <div className="mt-5 rounded-[var(--radius-field)] border border-error/30 bg-error-soft p-4">
            <h3 className="font-semibold text-error">Close account</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-error/90">
              Review pending payments, holds, service requests and remaining wallet funds first.
              Closure requires an additional confirmation.
            </p>
            <Link
              href="/app/support"
              className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-error underline-offset-4 hover:underline"
            >
              Review account closure options
              <ArrowRight aria-hidden className="size-3.5" />
            </Link>
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
