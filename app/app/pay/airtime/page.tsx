import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, RailLink } from "@/components/app/ui";
import { ChoiceGroup, PaymentSummary } from "@/components/app/purchase";
import { WalletRail } from "@/components/app/wallet-rail";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { AIRTIME_PRESETS, NETWORKS } from "@/lib/pay-data";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Buy airtime" };

const AMOUNT = 2000;

export default function BuyAirtimePage() {
  return (
    <>
      <PageHeader back="Pay bills" backHref="/app/pay" title="Buy airtime" />

      <SplitBody
        rail={
          <>
            <WalletRail />
            <PaymentSummary service="Airtime · Airtel" amount={AMOUNT} total={AMOUNT} />
            <Panel title="Need a data plan instead?">
              <RailLink href="/app/pay/data">Browse data bundles</RailLink>
            </Panel>
          </>
        }
      >
        <Panel title="Airtime details">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <ChoiceGroup
              legend="Select network · demo options"
              name="network"
              options={NETWORKS}
              defaultValue="Airtel"
            />
            <dl className="contents">
              <FieldBox label="Saved recipient" value="Ada · Airtel · ••• 8810" />
              <FieldBox
                label="Phone number"
                value="0802 ••• 8810"
                hint="Enter an 11-digit Nigerian mobile number. Masked demo recipient."
              />
            </dl>
            <ChoiceGroup
              legend="Amount"
              name="amount"
              options={AIRTIME_PRESETS.map((a) => money(a))}
              defaultValue={money(AMOUNT)}
            />
            <dl className="contents">
              <FieldBox
                label="Custom amount (NGN)"
                value="2,000.00"
                hint="Choose a preset or enter your own amount."
              />
            </dl>
            <Checkbox name="saveBeneficiary" label="Save this number as a beneficiary" />
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

        {/* Choosing a network does not prove the number belongs to it, and a
            mistyped digit sends real money to a stranger. The warning sits
            after the form, where the last thing read is "check it". */}
        <Notice title="Check the recipient">
          A network selection does not validate number ownership. Confirm the network and phone
          number with the recipient.
        </Notice>
      </SplitBody>
    </>
  );
}
