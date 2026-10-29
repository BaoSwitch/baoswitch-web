import type { Metadata } from "next";
import { UploadCloud } from "lucide-react";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow } from "@/components/app/ui";
import { ChoiceGroup, PaymentSummary, ValidatedNote } from "@/components/app/purchase";
import { Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SMS, SMS_TOTAL } from "@/lib/pay-data";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Send bulk SMS" };

export default function BulkSmsPage() {
  return (
    <>
      <PageHeader
        back="Pay bills"
        backHref="/app/pay"
        title="Send bulk SMS"
        lead="Compose a clear message for recipients who have agreed to hear from you."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Message preview">
              <p className="text-[12px] font-semibold tracking-wide text-muted uppercase">
                From · {SMS.senderId}
              </p>
              <ValidatedNote title="SMS preview">{SMS.message}</ValidatedNote>
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                Preview only. Delivery depends on network acceptance and recipient availability.
              </p>
            </Panel>

            <PaymentSummary
              service="Bulk SMS"
              amount={SMS_TOTAL}
              total={SMS_TOTAL}
              lines={
                <>
                  <DetailRow label="Recipients" value={SMS.recipients} />
                  <DetailRow
                    label="Billable segments"
                    value={`${SMS.recipients} × ${SMS.segmentsPerRecipient} = ${SMS.recipients * SMS.segmentsPerRecipient}`}
                  />
                  <DetailRow label="Demo unit cost" value={`${money(SMS.unitCost)} per segment`} />
                </>
              }
            />

            <Notice title="Check the estimate">
              {SMS.recipients} recipients × {SMS.segmentsPerRecipient} segment ×{" "}
              {money(SMS.unitCost)} = {money(SMS_TOTAL)}. Unicode or a longer message may increase
              the segment count. No live price or sender approval is implied.
            </Notice>
          </>
        }
      >
        <Panel title="Message composer">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <dl className="contents">
              <FieldBox
                label="Sender identity"
                value={SMS.senderId}
                hint={`${SMS.senderId.length} characters · Example sender identity; provider acceptance is not assumed.`}
              />
            </dl>
            <ChoiceGroup
              legend="Add recipients"
              name="recipientSource"
              options={["Manual entry", "Import CSV"]}
              defaultValue="Manual entry"
            />
            <dl className="contents">
              <FieldBox
                label="Recipient numbers"
                value="0803 ••• 4421, 0802 ••• 8810, + 18 demo recipients"
                hint={`${SMS.recipients} valid recipients · 0 duplicates · Numbers are masked in this design.`}
              />
            </dl>

            <div className="flex flex-col items-center gap-1 rounded-[var(--radius-field)] border border-dashed border-line2 bg-surface2 p-6 text-center">
              <UploadCloud aria-hidden className="size-6 text-muted" />
              <p className="text-[14px] font-semibold text-ink">Or import a recipient list</p>
              <p className="text-[12px] text-muted">
                CSV · One Nigerian number per row · Up to 1 MB
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="sms-message" className="text-[13px] font-medium text-muted">
                Message
              </label>
              <textarea
                id="sms-message"
                name="message"
                rows={4}
                defaultValue={SMS.message}
                maxLength={SMS.maxChars}
                className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] text-ink focus-visible:border-primary"
              />
              <p className="flex flex-wrap gap-x-6 text-[12px] text-muted">
                <span>
                  Message length{" "}
                  <span className="num text-ink">
                    {SMS.message.length} / {SMS.maxChars} characters
                  </span>
                </span>
                <span>
                  Encoding / segments{" "}
                  <span className="text-ink">
                    {SMS.encoding} · {SMS.segmentsPerRecipient} segment per recipient
                  </span>
                </span>
              </p>
            </div>

            {/* Consent is a legal precondition for bulk messaging, not a
                nicety, so the box is required rather than pre-ticked. */}
            <Checkbox
              name="consent"
              required
              label="These recipients consented to this message and I can honour opt-out requests."
            />

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Send SMS
              </Button>
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Save draft
              </Button>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
