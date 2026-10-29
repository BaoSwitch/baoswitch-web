import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, RailLink } from "@/components/app/ui";
import { ChoiceGroup, PaymentSummary, ValidatedNote } from "@/components/app/purchase";
import { WalletRail } from "@/components/app/wallet-rail";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { DISCOS } from "@/lib/pay-data";

export const metadata: Metadata = { title: "Pay electricity" };

const AMOUNT = 5000;

export default function PayElectricityPage() {
  return (
    <>
      <PageHeader back="Pay bills" backHref="/app/pay" title="Pay electricity" />

      <SplitBody
        rail={
          <>
            <WalletRail />
            <PaymentSummary service="Ikeja Electric · Prepaid" amount={AMOUNT} total={AMOUNT} />
            <Panel title="Where to find your token">
              <Notice title="Available after success">
                After a successful prepaid payment, open the transaction details to securely
                reveal and copy your token. Postpaid bills do not generate prepaid tokens.
              </Notice>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/transactions">Transaction history</RailLink>
            </Panel>
          </>
        }
      >
        <Panel title="Electricity account">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <div className="rounded-[var(--radius-field)] border border-line p-4">
              <label htmlFor="disco" className="text-[13px] font-medium text-muted">
                Distribution company
              </label>
              <select
                id="disco"
                name="disco"
                defaultValue="Ikeja Electric"
                className="mt-1 w-full bg-transparent text-[15px] text-ink outline-none"
              >
                {DISCOS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <ChoiceGroup
              legend="Meter type"
              name="meterType"
              options={["Prepaid", "Postpaid"]}
              defaultValue="Prepaid"
            />
            <dl className="contents">
              <FieldBox label="Saved account" value="Home electricity · •••• 2901" />
              <FieldBox
                label="Meter / customer number"
                value="•••• •••• 2901"
                hint="Use the number on your meter or bill, not a phone number."
              />
            </dl>
            <div>
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Validate meter
              </Button>
            </div>
            <ValidatedNote title="Demo meter validated">
              Customer: ADA O••••• · Residential prepaid meter · Ikeja, Lagos. This is illustrative
              validation, not a live provider lookup.
            </ValidatedNote>
            <dl className="contents">
              <FieldBox label="Amount (NGN)" value="5,000.00" />
            </dl>
            <Checkbox
              name="saveBeneficiary"
              defaultChecked
              label="Save this account as Home electricity"
            />
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Pay now
              </Button>
              <ButtonLink href="/app/pay" variant="ghost" size="md" className="border-line2">
                Back to pay bills
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
