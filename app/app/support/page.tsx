import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, Grid3x3, Search, Wallet } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, RailLink } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { ButtonLink } from "@/components/ui/button";
import { SUPPORT_TICKET, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Help centre" };

const TOPICS = [
  { title: "Payments", icon: CreditCard, href: "/app/support/payments" },
  { title: "Wallet funding", icon: Wallet, href: "/app/support/funding" },
  { title: "Service requests", icon: Grid3x3, href: "/app/support/requests" },
];

const FAQS = [
  {
    q: "Why is my payment pending?",
    a: "The provider has not sent a final result. Check its status in Transactions, and avoid repeating the purchase while it is pending.",
  },
  {
    q: "I sent a bank transfer. Where is my wallet credit?",
    a: "Open My wallet → Funding history. A transfer marked as sent is credited only after confirmation. Keep your bank receipt.",
  },
  {
    q: "Where is my prepaid electricity token?",
    a: "Open the successful electricity payment in Transaction history and use secure reveal in the token section.",
  },
  {
    q: "How do I retrieve an exam checker PIN?",
    a: "After success, open the transaction’s secure output area. PINs and serials are never included in notification previews.",
  },
  {
    q: "Is my architecture or laundry time booked?",
    a: "A submitted request is not a confirmed booking. Check the request details for its current state.",
  },
];

export default function HelpCentrePage() {
  return (
    <>
      <PageHeader
        back="Overview"
        backHref="/app"
        title="How can we help?"
        lead="Find a clear next step for payments, wallet funding and service requests."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Need a hand?">
              <p className="text-[13px] leading-relaxed text-muted">
                Open a support request inside the app. Include the transaction or booking
                reference so the team can understand the issue.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <ButtonLink href="/app/support/report" size="md">
                  Report a transaction issue
                </ButtonLink>
                <ButtonLink href="/app/support/report" variant="ghost" size="md" className="border-line2">
                  Ask a general question
                </ButtonLink>
              </div>
              <hr className="bs-rule my-4" />
              <RailLink href={`/app/support/tickets/${SUPPORT_TICKET.id}`}>
                My support tickets
              </RailLink>
            </Panel>

            <Panel title="Your open ticket" aside={<DemoChip>Awaiting provider response</DemoChip>}>
              <p className="num font-semibold text-primary-text">{SUPPORT_TICKET.id}</p>
              <p className="mt-1 text-[13px] text-muted">
                {SUPPORT_TICKET.service} payment pending · {money(SUPPORT_TICKET.amount)}
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href={`/app/support/tickets/${SUPPORT_TICKET.id}`}>View ticket</RailLink>
            </Panel>

            <Notice title="Keep private details private">
              Support will never need your password, transaction PIN or verification codes. Redact
              these details from attachments.
            </Notice>
          </>
        }
      >
        <Panel>
          <label htmlFor="help-q" className="text-[13px] font-medium text-muted">
            Search the help centre
          </label>
          <div className="relative mt-1.5">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input
              id="help-q"
              type="search"
              placeholder="Enter a question, topic or service"
              className="h-12 w-full rounded-[var(--radius-field)] border border-line bg-surface pr-4 pl-10 text-[15px] text-ink placeholder:text-muted focus-visible:border-primary"
            />
          </div>
        </Panel>

        <ul className="grid gap-5 sm:grid-cols-3">
          {TOPICS.map((t) => (
            <li key={t.title}>
              <Link
                href={t.href}
                className="bs-card bs-edge bs-lift group flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-6"
              >
                <t.icon aria-hidden className="bs-raise size-6 text-primary-text" strokeWidth={1.7} />
                <span className="bs-raise text-lg font-semibold text-primary-text">{t.title}</span>
                <span className="bs-raise mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text">
                  Browse articles
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Panel title="Frequently asked questions">
          {/* Native disclosure: works without JavaScript, and find-in-page
              can reach an answer that is still collapsed. */}
          <div className="flex flex-col">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-line last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-primary-text [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-muted transition-transform group-open:rotate-90"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </summary>
                <p className="pb-4 text-[14px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
