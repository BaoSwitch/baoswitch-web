import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, Notice, DetailRow, RailLink, Timeline } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import { SUPPORT_TICKET, money } from "@/lib/app-data";

export function generateStaticParams() {
  return [{ id: SUPPORT_TICKET.id }];
}

export const metadata: Metadata = { title: `Support ticket · ${SUPPORT_TICKET.id}` };

const MESSAGES = [
  {
    author: "Ada Okafor",
    at: "18 Oct · 11:10 AM WAT",
    body: "I renewed the Demo Family subscription at 10:38 AM. The payment still shows Pending and I have not received provider confirmation. Please check the transaction status.",
    mine: true,
  },
  {
    author: "BAOSWITCH support",
    at: "18 Oct · 11:18 AM WAT",
    body: "We’ve linked your report to BSW-261018-0838. This illustrative payment is still awaiting the provider’s response. Please don’t submit another renewal while it is pending. We’ll add an update here when there is more information.",
    mine: false,
  },
];

export default function SupportTicketPage() {
  return (
    <>
      <PageHeader
        back="My support tickets"
        backHref="/app/support"
        title={`Support ticket · ${SUPPORT_TICKET.id}`}
        lead={`${SUPPORT_TICKET.subject} · Created ${SUPPORT_TICKET.createdAt}.`}
      />

      <SplitBody
        rail={
          <>
            <Panel title="Ticket information">
              <dl>
                <DetailRow label="Ticket ID" value={SUPPORT_TICKET.id} />
                <DetailRow label="Category" value={SUPPORT_TICKET.category} />
                <DetailRow label="Linked transaction" value={SUPPORT_TICKET.linkedTx} />
                <DetailRow
                  label="Service / amount"
                  value={`${SUPPORT_TICKET.service} · ${money(SUPPORT_TICKET.amount)}`}
                />
                <DetailRow label="Preferred reply channel" value="In-app support inbox" />
              </dl>
              <hr className="bs-rule my-4" />
              <RailLink href={`/app/transactions/${SUPPORT_TICKET.linkedTx}`}>
                Open transaction details
              </RailLink>
            </Panel>

            <Panel title="Ticket timeline">
              <Timeline
                steps={[
                  { label: "Ticket created", state: "done" },
                  { label: "Support review started", state: "done" },
                  { label: "Awaiting provider response", state: "current" },
                  { label: "Resolution", detail: "Not yet confirmed.", state: "upcoming" },
                ]}
              />
            </Panel>
          </>
        }
      >
        <Panel title="Conversation" aside={<DemoChip>{SUPPORT_TICKET.state}</DemoChip>}>
          <ol className="flex flex-col gap-4">
            {MESSAGES.map((m) => (
              <li
                key={m.at}
                className={`rounded-[var(--radius-field)] p-4 ${
                  m.mine ? "bg-surface2" : "border border-primary/20 bg-primary-soft"
                }`}
              >
                <p className="text-[13px] font-semibold text-primary-text">
                  {m.author} · {m.at}
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{m.body}</p>
              </li>
            ))}
          </ol>

          <Notice className="mt-4" tone="warning" title="Investigation in progress">
            No resolution, refund or subscription activation has been confirmed. Your{" "}
            {money(SUPPORT_TICKET.amount)} payment remains on hold.
          </Notice>

          <form className="mt-5 flex flex-col gap-3" action={`/app/support/tickets/${SUPPORT_TICKET.id}`}>
            <label htmlFor="reply" className="text-[13px] font-medium text-muted">
              Reply to this ticket
            </label>
            <textarea
              id="reply"
              name="reply"
              rows={3}
              placeholder="Enter a reply or add relevant information"
              className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] text-ink placeholder:text-muted focus-visible:border-primary"
            />
            <p className="text-[12px] text-muted">
              Never include passwords, PINs or verification codes. Redact attachments before
              uploading.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Send reply
              </Button>
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Attach file
              </Button>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
