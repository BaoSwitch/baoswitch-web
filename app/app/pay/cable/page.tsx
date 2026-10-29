import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow } from "@/components/app/ui";
import { ChoiceGroup, PaymentSummary, ValidatedNote } from "@/components/app/purchase";
import { WalletRail } from "@/components/app/wallet-rail";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { CABLE_PACKAGE, CABLE_PROVIDERS } from "@/lib/pay-data";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Cable TV subscription" };

export default function CableTvPage() {
  return (
    <>
      <PageHeader back="Pay bills" backHref="/app/pay" title="Cable TV subscription" />

      <SplitBody
        rail={
          <>
            <WalletRail />
            <PaymentSummary
              service={`${CABLE_PACKAGE.provider} · Demo Family`}
              amount={CABLE_PACKAGE.price}
              total={CABLE_PACKAGE.price}
            />

            {/* This is the one rail warning that is about *this account's*
                state rather than the product generally: there is already a
                held payment for the same decoder, and paying twice is the
                mistake the whole screen exists to prevent. */}
            <Notice tone="warning" title="Check for pending renewals">
              This account already has a {money(CABLE_PACKAGE.price)} DStv payment pending,
              BSW-261018-0838. Check that payment before submitting another renewal.
            </Notice>

            <Panel title="Renewal guidance">
              <dl>
                <DetailRow label="Activation" value="After provider confirmation" />
                <DetailRow label="Demo pricing" value="Illustrative, not a live quote" />
              </dl>
            </Panel>
          </>
        }
      >
        <Panel title="Subscription details">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <ChoiceGroup
              legend="Provider · demo options"
              name="provider"
              options={CABLE_PROVIDERS}
              defaultValue="DStv"
            />
            <dl className="contents">
              <FieldBox label="Saved decoder" value="Living room TV · •••• 5812" />
              <FieldBox
                label="Smartcard / IUC number"
                value="•••• ••5812"
                hint="Check the identifier on your decoder or provider account."
              />
            </dl>
            <div>
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Validate smartcard
              </Button>
            </div>
            <ValidatedNote title="Demo customer validated">
              ADA O••••• · Current package: DStv Demo Family. Not a live account lookup.
            </ValidatedNote>
            <ChoiceGroup
              legend="Subscription action"
              name="action"
              options={["Renew existing package", "Choose a new package"]}
              defaultValue="Renew existing package"
            />
            <dl className="contents">
              <FieldBox
                label="Package"
                value={`${CABLE_PACKAGE.name} · ${CABLE_PACKAGE.cycle} · ${money(CABLE_PACKAGE.price)}`}
              />
              <FieldBox label="Requested renewal period" value="One monthly cycle" />
            </dl>
            <Checkbox name="saveBeneficiary" defaultChecked label="Keep this decoder as a beneficiary" />
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Subscribe now
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
