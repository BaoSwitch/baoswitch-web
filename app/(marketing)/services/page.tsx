import type { Metadata } from "next";
import { SplitPage, Eyebrow } from "@/components/marketing/split-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Data, airtime, cable TV, electricity, exam pins, bulk SMS, laundry and architectural services from one BAOSWITCH wallet.",
};

/**
 * The frame renders this as one 711px run of hyphen-prefixed lines. Splitting
 * it into a titled list keeps the copy verbatim while giving each service a
 * heading a reader — or a search engine — can actually land on.
 */
const CATALOGUE = [
  {
    title: "Mobile data bundles",
    body: "MTN, Airtel, Glo, 9mobile — corporate gifting, SME, and direct data at wholesale prices.",
  },
  {
    title: "Airtime VTU",
    body: "Instant airtime recharge for all networks with discounts up to 3%.",
  },
  {
    title: "Cable TV subscription",
    body: "DStv, GOtv and StarTimes instant renewal and activation.",
  },
  {
    title: "Electricity bill payment",
    body: "Prepaid and postpaid for Ikeja Electric, Abuja Electric, PHED, Eko Electric and all other DISCOs — token delivered instantly.",
  },
  {
    title: "Exam & result pins",
    body: "WAEC, NECO and NABTEB result checker pins, and JAMB e-PIN.",
  },
  {
    title: "Data reselling API & agent platform",
    body: "An opportunity for students and agents to become resellers and earn commission.",
  },
  {
    title: "Bulk SMS & airtime conversion",
    body: "Coming soon under BAOSWITCH services.",
    soon: true,
  },
  { title: "Premium laundry service", body: "BAO 360 Laundry — fast, reliable garment care." },
  {
    title: "Architectural designs & real estate",
    body: "Hire an architect for floor plans, 3D visualisation and full design packages.",
  },
];

export default function ServicesPage() {
  return (
    <SplitPage photo="/assets/photos/services.png" side="start">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <Eyebrow>Products and services information</Eyebrow>
          <h1 className="bs-h2 text-primary-text">Everything we switch</h1>
        </section>

        <ul className="flex flex-col gap-4">
          {CATALOGUE.map((item) => (
            <li
              key={item.title}
              className="bs-card bs-edge bs-lift flex flex-col gap-1.5 rounded-[var(--radius-card)] p-6"
            >
              <h2 className="bs-raise flex flex-wrap items-center gap-2.5 font-semibold text-primary-text">
                {item.title}
                {item.soon ? (
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-on-secondary uppercase">
                    Coming soon
                  </span>
                ) : null}
              </h2>
              <p className="bs-raise text-[15px] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/pricing" variant="outline" size="lg">
            See pricing
          </ButtonLink>
          <ButtonLink href="/signup" variant="primary" size="lg">
            Register
          </ButtonLink>
        </div>
      </div>
    </SplitPage>
  );
}
