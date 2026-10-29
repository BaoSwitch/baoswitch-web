import type { Metadata } from "next";
import { UploadCloud } from "lucide-react";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow, RailLink } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { StatusPill } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { SUPPORT_TICKET, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Report a transaction issue" };

export default function ReportIssuePage() {
  return (
    <>
      <PageHeader
        back="Help centre"
        backHref="/app/support"
        title="Report a transaction issue"
        lead="Share what happened so support can investigate the right payment."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Linked transaction" aside={<StatusPill status="pending" />}>
              <dl>
                <DetailRow label="Service" value="Cable TV · DStv" />
                <DetailRow label="Amount / demo fee" value={`${money(SUPPORT_TICKET.amount)} / ₦0.00`} />
                <DetailRow label="Reference" value={SUPPORT_TICKET.linkedTx} />
                <DetailRow label="Payment time" value="18 Oct · 10:38 AM WAT" />
                <DetailRow label="Wallet status" value={`${money(SUPPORT_TICKET.amount)} held`} />
              </dl>
              <hr className="bs-rule my-4" />
              <RailLink href={`/app/transactions/${SUPPORT_TICKET.linkedTx}`}>
                Check transaction status
              </RailLink>
            </Panel>

            <Notice title="No need to pay again">
              While this payment is pending, keep its reference and wait for the final provider
              response. Reporting an issue does not cancel or repeat the payment.
            </Notice>

            <Panel title="What support needs">
              <p className="text-[13px] leading-relaxed text-muted">
                Explain the issue, attach a redacted receipt if helpful, and keep replies in your
                ticket. Never share your transaction PIN.
              </p>
            </Panel>
          </>
        }
      >
        <Panel title="Issue details">
          <form
            className="flex flex-col gap-4"
            action={`/app/support/tickets/${SUPPORT_TICKET.id}`}
            method="get"
          >
            <dl className="contents">
              <FieldBox
                label="Transaction"
                value={`${SUPPORT_TICKET.linkedTx} · DStv · ${money(SUPPORT_TICKET.amount)}`}
              />
            </dl>
            <ChoiceGroup
              legend="Issue category"
              name="category"
              options={[
                "Payment pending / service not confirmed",
                "Unexpected debit",
                "Wrong recipient",
              ]}
              defaultValue="Payment pending / service not confirmed"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[13px] font-medium text-muted">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                defaultValue={SUPPORT_TICKET.subject}
                className="h-12 w-full rounded-[var(--radius-field)] border border-line bg-surface px-4 text-[15px] text-ink focus-visible:border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="details" className="text-[13px] font-medium text-muted">
                What happened
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                defaultValue="I renewed the Demo Family subscription at 10:38 AM. The payment still shows Pending and I have not received provider confirmation. Please check the transaction status."
                className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] leading-relaxed text-ink focus-visible:border-primary"
              />
            </div>

            <div className="flex flex-col items-center gap-1 rounded-[var(--radius-field)] border border-dashed border-line2 bg-surface2 p-6 text-center">
              <UploadCloud aria-hidden className="size-6 text-muted" />
              <p className="text-[14px] font-semibold text-ink">
                Attach supporting evidence (optional)
              </p>
              <p className="text-[12px] text-muted">
                JPG, PNG or PDF · Up to 5 MB · Redact sensitive information
              </p>
            </div>

            <dl className="contents">
              <FieldBox label="Reply channel" value="In-app support inbox" />
            </dl>

            <Checkbox
              name="redacted"
              required
              defaultChecked
              label="I confirm the information is accurate and I have removed passwords, PINs and verification codes from my attachments."
            />

            {/* Duplicate tickets split one investigation across two threads,
                which is how a pending payment ends up answered twice and
                resolved neither time. */}
            <Notice tone="warning" title="Avoid duplicate tickets">
              If you have already reported this payment, continue in the existing ticket. This
              form illustrates the report that becomes {SUPPORT_TICKET.id}.
            </Notice>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Create support ticket
              </Button>
              <ButtonLink href="/app/support" variant="ghost" size="md" className="border-line2">
                Cancel report
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
