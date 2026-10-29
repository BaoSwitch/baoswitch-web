import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice } from "@/components/app/ui";
import { ChoiceCard, ChoiceGroup, PaymentSummary } from "@/components/app/purchase";
import { WalletRail } from "@/components/app/wallet-rail";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { DATA_BUNDLES, DATA_PERIODS, NETWORKS } from "@/lib/pay-data";

export const metadata: Metadata = { title: "Buy data" };

const SELECTED = DATA_BUNDLES[1];

export default function BuyDataPage() {
  return (
    <>
      <PageHeader
        back="Pay bills"
        backHref="/app/pay"
        title="Buy data"
        lead="Choose a network and bundle, then review your purchase before authorising."
      />

      <SplitBody
        rail={
          <>
            <WalletRail />
            <PaymentSummary
              service={`MTN · ${SELECTED.size} / 30 days`}
              amount={SELECTED.price}
              total={SELECTED.price}
            />
            <Notice title="Example plans only">
              Allowances, validity and prices shown here are demo data, not live provider
              inventory. Delivery depends on provider confirmation.
            </Notice>
          </>
        }
      >
        <Panel title="Choose your bundle">
          <form className="flex flex-col gap-4" action="/app/pay/review" method="get">
            <ChoiceGroup legend="Network" name="network" options={NETWORKS} defaultValue="MTN" />
            <ChoiceGroup
              legend="Plan period"
              name="period"
              options={DATA_PERIODS}
              defaultValue="Monthly"
            />
            <ul className="flex flex-col gap-3">
              {DATA_BUNDLES.map((bundle) => (
                <li key={bundle.id}>
                  <ChoiceCard
                    name="bundle"
                    value={bundle.id}
                    defaultChecked={bundle.id === SELECTED.id}
                    title={`${bundle.size} · ${bundle.period}`}
                    detail={
                      bundle.id === SELECTED.id
                        ? `${bundle.validity} · Illustrative bundle`
                        : undefined
                    }
                    price={bundle.price}
                  />
                </li>
              ))}
            </ul>
            <dl className="contents">
              <FieldBox label="Saved recipient" value="My MTN line · ••• 4421" />
              <FieldBox
                label="Phone number"
                value="0803 ••• 4421"
                hint="Enter an 11-digit Nigerian mobile number. Masked demo recipient."
              />
            </dl>
            <Checkbox name="saveBeneficiary" defaultChecked label="Save as My MTN line" />
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
      </SplitBody>
    </>
  );
}
