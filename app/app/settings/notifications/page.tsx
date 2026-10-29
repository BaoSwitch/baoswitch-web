import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Panel, SplitBody, ServiceIcon } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Notifications & preferences" };

const INBOX = [
  {
    title: "Support has replied",
    body: "BSW-SUP-1042 · Your DStv issue is awaiting a provider response.",
    at: "18 Oct · 11:18 AM WAT",
    href: "/app/support/tickets/BSW-SUP-1042",
    unread: true,
    icon: "sms" as const,
  },
  {
    title: "Funding awaiting confirmation",
    body: `${money(10000)} · FND-261018-1105 · Not yet credited.`,
    at: "18 Oct · 11:07 AM WAT",
    href: "/app/wallet/status",
    unread: true,
    icon: "electricity" as const,
  },
  {
    title: "MTN data purchase successful",
    body: `${money(1500)} · BSW-261018-0842 · View your receipt.`,
    at: "18 Oct · 10:42 AM WAT",
    href: "/app/transactions/BSW-261018-0842",
    unread: false,
    icon: "data" as const,
  },
  {
    title: "DStv payment pending",
    body: `${money(5000)} is on hold · BSW-261018-0838.`,
    at: "18 Oct · 10:38 AM WAT",
    href: "/app/transactions/BSW-261018-0838",
    unread: false,
    icon: "cable" as const,
  },
  {
    title: "Electricity token available",
    body: "BSW-261017-0621 · Reveal your token securely.",
    at: "17 Oct · 09:21 AM WAT",
    href: "/app/transactions/BSW-261017-0621",
    unread: false,
    icon: "electricity" as const,
  },
];

/**
 * A labelled switch.
 *
 * A real checkbox with a switch drawn on it, rather than a styled `<div>`:
 * it is reachable by keyboard, announces its on/off state, and submits with
 * the form. `peer-checked` drives the visual.
 */
function Toggle({
  name,
  label,
  detail,
  defaultChecked,
}: {
  name: string;
  label: string;
  detail: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 border-b border-line py-4 last:border-0">
      <span className="min-w-0">
        <span className="block font-semibold text-primary-text">{label}</span>
        <span className="block text-[13px] text-muted">{detail}</span>
      </span>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
      <span
        aria-hidden
        className="relative mt-1 h-6 w-11 shrink-0 rounded-full bg-line2 transition-colors peer-checked:bg-primary peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-text after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
      />
    </label>
  );
}

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        back="Profile & account settings"
        backHref="/app/settings"
        title="Notifications & preferences"
        lead="Stay informed about your payments and choose how we reach you."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Transactional alert channels">
              <Toggle
                name="inApp"
                defaultChecked
                label="In-app notifications"
                detail="Payment, wallet and service updates."
              />
              <Toggle
                name="email"
                defaultChecked
                label="Email alerts"
                detail="Receipts and important account updates."
              />
              <Toggle
                name="sms"
                label="SMS alerts"
                detail="Selected transaction status updates."
              />
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                Security and essential service messages may still be required.
              </p>
            </Panel>

            <Panel title="Support & service updates">
              <Toggle
                name="supportReplies"
                defaultChecked
                label="Support reply alerts"
                detail="When a support ticket has a new reply."
              />
              <Toggle
                name="bookings"
                defaultChecked
                label="Booking request updates"
                detail="Architecture and BAO 360 progress."
              />
            </Panel>

            {/* Marketing is opt-in and sits in its own card, apart from the
                transactional switches above, so consent for one is never
                mistaken for consent to the other. */}
            <Panel title="Optional marketing">
              <Toggle
                name="marketing"
                label="Offers & product news"
                detail="Optional marketing messages, separate from transactional alerts."
              />
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                Opt in only if you want offers. You can change this choice later.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button type="submit" size="md">
                  Save preferences
                </Button>
                <Button type="reset" variant="ghost" size="md" className="border-line2">
                  Cancel
                </Button>
              </div>
            </Panel>
          </>
        }
      >
        <Panel
          title="Notification inbox"
          aside={
            <Button type="button" variant="ghost" size="sm" className="border-line2">
              Mark all as read
            </Button>
          }
        >
          <ChoiceGroup
            legend="Filter"
            name="filter"
            options={["All", "Unread · 2", "Payments", "Support"]}
            defaultValue="All"
          />

          <ul className="mt-4 flex flex-col gap-3">
            {INBOX.map((n) => (
              <li key={n.title + n.at}>
                <Link
                  href={n.href}
                  className={`flex items-start gap-4 rounded-[var(--radius-field)] border p-4 transition-colors ${
                    n.unread
                      ? "border-primary/20 bg-primary-soft hover:border-primary/40"
                      : "border-line hover:border-line2"
                  }`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-chip)] bg-surface text-primary-text">
                    <ServiceIcon name={n.icon} className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3">
                      <span className="font-semibold text-primary-text">{n.title}</span>
                      {n.unread ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-white">
                          Unread
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted">{n.body}</span>
                    <span className="mt-1 block text-[12px] text-muted">{n.at}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </SplitBody>
    </>
  );
}
