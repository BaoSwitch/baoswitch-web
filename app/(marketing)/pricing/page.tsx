import type { Metadata } from "next";
import { Band, SectionHeading } from "@/components/marketing/section";
import { PriceTable } from "@/components/marketing/price-table";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import {
  AIRTIME_PRICES,
  ARCHITECTURE_PRICES,
  CABLE_PRICES,
  formatNaira,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Airtime, cable TV and architectural service prices on BAOSWITCH. No service charge on airtime.",
};

export default function PricingPage() {
  return (
    <>
      <Band className="pt-14 pb-10 lg:pt-20">
        <div className="bs-wrap flex flex-col gap-4">
          <h1 className="bs-h2 text-primary-text">Pricing</h1>
          <p className="bs-lead max-w-[46rem] text-muted">
            What you pay, in full, before you start. Airtime carries no service charge at all —
            ₦1,000 of airtime costs ₦1,000.
          </p>
        </div>
      </Band>

      <Band tone="raised" className="py-10 lg:py-16">
        <div className="bs-wrap grid gap-8 xl:grid-cols-2">
          <Reveal>
            <PriceTable
              caption="Airtime"
              columns={[
                { key: "network", label: "Network" },
                { key: "amount", label: "Airtime amount", numeric: true },
                { key: "pays", label: "Customer pays", numeric: true },
                { key: "charge", label: "Service charge", numeric: true },
              ]}
              rows={AIRTIME_PRICES.map((r) => ({
                network: r.network,
                amount: formatNaira(r.amount),
                pays: formatNaira(r.pays),
                charge: formatNaira(r.charge),
              }))}
            />
          </Reveal>
          <Reveal delay={90}>
            <PriceTable
              caption="Cable TV subscriptions"
              columns={[
                { key: "provider", label: "Service provider" },
                { key: "plan", label: "Subscription plan" },
                { key: "price", label: "Proposed price", numeric: true },
              ]}
              rows={CABLE_PRICES.map((r) => ({
                provider: r.provider,
                plan: r.plan,
                price: formatNaira(r.price),
              }))}
            />
          </Reveal>
        </div>
      </Band>

      <Band className="py-10 lg:py-16">
        <div className="bs-wrap flex flex-col gap-8">
          <Reveal>
            <PriceTable
              caption="Architectural & real estate services"
              columns={[
                { key: "category", label: "Service category" },
                { key: "description", label: "Description" },
                { key: "from", label: "Proposed starting price", numeric: true },
              ]}
              rows={ARCHITECTURE_PRICES.map((r) => ({
                category: r.category,
                description: r.description,
                from: formatNaira(r.from),
              }))}
            />
          </Reveal>
        </div>
      </Band>

      <Band tone="raised" className="py-14 lg:py-20">
        <div className="bs-wrap flex flex-col items-center gap-7 text-center">
          <SectionHeading
            align="center"
            title="Ready to start?"
            lead="Create an account, fund your wallet once, and pay for everything from one place."
          />
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/contact" variant="outline" size="lg">
              Talk to us
            </ButtonLink>
            <ButtonLink href="/signup" variant="primary" size="lg">
              Register
            </ButtonLink>
          </div>
        </div>
      </Band>
    </>
  );
}
