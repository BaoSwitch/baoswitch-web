import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, RailLink, DetailRow } from "@/components/app/ui";
import { ChoiceGroup, PaymentSummary, ValidatedNote } from "@/components/app/purchase";
import { WalletRail } from "@/components/app/wallet-rail";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { EXAM_BODIES, EXAM_PIN } from "@/lib/pay-data";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Buy exam PINs" };

const TOTAL = EXAM_PIN.quantity * EXAM_PIN.unitPrice;

export default function ExamPinsPage() {
  return (
    <>
      <PageHeader back="Pay bills" backHref="/app/pay" title="Buy exam PINs" />

      <SplitBody
        rail={
          <>
            <WalletRail />
            <PaymentSummary
              service={`${EXAM_PIN.body} · Result checker`}
              amount={TOTAL}
              total={TOTAL}
              lines={
                <DetailRow
                  label="Quantity × unit price"
                  value={`${EXAM_PIN.quantity} × ${money(EXAM_PIN.unitPrice)}`}
                />
              }
            />
            <Notice title="No live PINs in this demo">
              No usable exam credential is shown here. The secure retrieval journey is illustrated
              without exposing sensitive codes.
            </Notice>
          </>
        }
      >
        <Panel title="Exam checker details">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <ChoiceGroup
              legend="Examination body"
              name="body"
              options={EXAM_BODIES}
              defaultValue={EXAM_PIN.body}
            />
            <dl className="contents">
              <FieldBox label="Checker type" value={EXAM_PIN.product} />
            </dl>
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox
                label="Quantity"
                value={EXAM_PIN.quantity}
                hint="Whole-number quantity only."
              />
              <FieldBox
                label="Unit price"
                value={money(EXAM_PIN.unitPrice)}
                hint="Illustrative price, not live inventory."
              />
            </dl>
            <ValidatedNote title="Confirm the checker type">
              Ensure the selected product is suitable for your exam and intended use before
              purchase. Availability is subject to confirmation.
            </ValidatedNote>
            <dl className="contents">
              <FieldBox
                label="Delivery and retrieval"
                value="Secure retrieval in transaction details"
                hint="A notification will tell you when the demo purchase is ready. PINs are not included in notification previews."
              />
            </dl>
            <Checkbox
              name="confirmed"
              defaultChecked
              required
              label="I have checked the exam body, checker type and quantity."
            />
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Buy now
              </Button>
              <ButtonLink href="/app/pay" variant="ghost" size="md" className="border-line2">
                Back to pay bills
              </ButtonLink>
            </div>
          </form>
        </Panel>

        <Panel title="Retrieving your purchase">
          <p className="text-[15px] leading-relaxed text-muted">
            After a successful purchase, open the receipt in Transaction history. Use secure
            reveal for the serial number and checker PIN. Keep these details private.
          </p>
          <hr className="bs-rule my-4" />
          <RailLink href="/app/support">Help with exam PINs</RailLink>
        </Panel>
      </SplitBody>
    </>
  );
}
