import type { Metadata } from "next";
import { SplitPage, Eyebrow } from "@/components/marketing/split-page";
import { ButtonLink } from "@/components/ui/button";
import { SITE_LEGAL_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${SITE_LEGAL_NAME} is a Nigerian digital VTU and bill payment platform under the BAO Group.`,
};

export default function AboutPage() {
  return (
    <SplitPage photo="/assets/photos/about.png" side="end">
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <Eyebrow>About us</Eyebrow>
          <h1 className="bs-h2 text-primary-text">A digital switch for everyday payments</h1>
          <p className="bs-lead text-muted">
            {SITE_LEGAL_NAME} is a Nigerian digital VTU and bill payment platform under the BAO
            Group. We provide instant, affordable, and reliable access to mobile data, airtime,
            cable TV subscriptions, electricity bills, and other essential digital services. Built
            for the fast-paced Nigerian youth and small businesses, BAOSWITCH removes the stress of
            bank delays and high charges by delivering services in seconds at cheaper rates.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <Eyebrow>Vision &amp; mission</Eyebrow>
          <dl className="flex flex-col gap-6">
            <div className="bs-card bs-edge flex flex-col gap-2 rounded-[var(--radius-card)] p-6">
              <dt className="bs-raise font-semibold text-primary-text">Business vision</dt>
              <dd className="bs-raise text-[15px] leading-relaxed text-muted">
                To become Nigeria&rsquo;s most trusted and fastest digital switch for everyday
                payments, powering millions of students, hustlers, and businesses across Africa.
              </dd>
            </div>
            <div className="bs-card bs-edge flex flex-col gap-2 rounded-[var(--radius-card)] p-6">
              <dt className="bs-raise font-semibold text-primary-text">Business mission</dt>
              <dd className="bs-raise text-[15px] leading-relaxed text-muted">
                To make data, airtime, and bill payments instant, affordable, and accessible to
                everyone in Nigeria, using simple technology and excellent customer support.
              </dd>
            </div>
          </dl>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/services" variant="outline" size="lg">
            Explore
          </ButtonLink>
          <ButtonLink href="/signup" variant="primary" size="lg">
            Register
          </ButtonLink>
        </div>
      </div>
    </SplitPage>
  );
}
