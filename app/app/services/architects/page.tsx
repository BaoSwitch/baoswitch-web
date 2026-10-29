import type { Metadata } from "next";
import { PageHeader, Panel, Notice, RailLink, FieldBox } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { DemoChip } from "@/components/ui/status";
import { ButtonLink } from "@/components/ui/button";
import { ARCHITECTS } from "@/lib/services-data";

export const metadata: Metadata = { title: "Hire an architect" };

export default function ArchitectsPage() {
  return (
    <>
      <PageHeader
        back="More services"
        backHref="/app/pay"
        title="Bring your next space to life"
        lead="Explore architectural design and real estate services, then request a consultation."
      />

      <div className="flex flex-col gap-5">
        {/* A directory that looks real implies vetting. It says plainly that
            nothing here is a credential check or a confirmed booking. */}
        <Notice title="Illustrative professional directory">
          All profiles, portfolios and availability in this demo are fictional. A request is not a
          confirmed booking, accreditation check or paid engagement.
        </Notice>

        <Panel>
          <dl className="grid gap-4 lg:grid-cols-3">
            <FieldBox label="Project type" value="Residential design" />
            <FieldBox label="Location" value="Abuja" />
            <FieldBox label="Consultation format" value="Remote or on-site request" />
          </dl>
          <ChoiceGroup
            className="mt-4"
            legend="Explore services"
            name="scope"
            options={["Residential", "Renovation", "Commercial", "Real estate concepts"]}
            defaultValue="Residential"
          />
        </Panel>

        <ul className="grid gap-5 lg:grid-cols-3">
          {ARCHITECTS.map((a) => (
            <li key={a.id} className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
              {/* The frames show portfolio photography here. None shipped
                  with the exports, so the card leads with the initials mark
                  rather than a stock photo standing in for someone's work. */}
              <span
                aria-hidden
                className="bs-raise flex size-14 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary-text"
              >
                {a.initials}
              </span>
              <p className="bs-raise mt-4">
                <DemoChip>Illustrative professional</DemoChip>
              </p>
              <h2 className="bs-raise mt-3 text-lg font-semibold text-primary-text">{a.name}</h2>
              <p className="bs-raise mt-1 font-medium text-ink">{a.speciality}</p>
              <p className="bs-raise mt-1 text-[13px] text-muted">
                {a.location} · {a.format}
              </p>
              <p className="bs-raise mt-3 text-[13px] leading-relaxed text-muted">
                Discuss scope, deliverables and any fees before committing. Credentials are not
                asserted in this demo.
              </p>
              <div className="bs-raise mt-5">
                <ButtonLink
                  href={`/app/services/architects/${a.id}`}
                  variant="ghost"
                  size="md"
                  className="w-full border-line2"
                >
                  View profile &amp; request
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>

        <Panel title="Not sure where to begin?">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-[46rem] text-[14px] leading-relaxed text-muted">
              Start with a short brief: your project type, location, priorities and budget range.
              The professional can then clarify whether the scope is a fit.
            </p>
            <RailLink href="/app/services/architects/requests">
              Track my architecture requests
            </RailLink>
          </div>
        </Panel>
      </div>
    </>
  );
}
