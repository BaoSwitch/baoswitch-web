import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { ARCHITECTS, ARCH_REQUEST } from "@/lib/services-data";

export function generateStaticParams() {
  return ARCHITECTS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const a = ARCHITECTS.find((x) => x.id === id);
  return { title: a ? `${a.name} · consultation request` : "Architect profile" };
}

export default async function ArchitectProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const architect = ARCHITECTS.find((a) => a.id === id);
  if (!architect) notFound();

  return (
    <>
      <PageHeader
        back="Browse architects"
        backHref="/app/services/architects"
        title="Architect profile & consultation request"
      />

      <SplitBody
        rail={
          <>
            <Panel>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary-text"
                >
                  {architect.initials}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-primary-text">{architect.name}</h2>
                  <p className="mt-1">
                    <DemoChip>Illustrative professional</DemoChip>
                  </p>
                </div>
              </div>
              <p className="mt-4 font-medium text-ink">{architect.speciality}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{architect.blurb}</p>
              <dl className="mt-4">
                <DetailRow label="Location" value={`${architect.location} · Remote requests`} />
                <DetailRow label="Credentials" value="Not asserted in this demo" />
                <DetailRow label="Consultation / project fee" value="To be discussed" />
              </dl>
            </Panel>

            <Notice title="A request, not a booking">
              Availability, scope, credentials and pricing all need discussion. This screen does
              not confirm a consultation or a paid contract.
            </Notice>
          </>
        }
      >
        <Panel title="Request a consultation">
          <form
            className="flex flex-col gap-4"
            action="/app/services/architects/requests"
            method="get"
          >
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox label="Project type" value="Residential renovation" />
              <FieldBox label="Project location" value="Asokoro, FCT Abuja" />
            </dl>
            <dl className="contents">
              <FieldBox label="Project title" value={ARCH_REQUEST.title} />
            </dl>
            <div className="flex flex-col gap-2">
              <label htmlFor="brief" className="text-[13px] font-medium text-muted">
                Project brief
              </label>
              <textarea
                id="brief"
                name="brief"
                rows={4}
                defaultValue={ARCH_REQUEST.brief}
                className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] leading-relaxed text-ink focus-visible:border-primary"
              />
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox label="Indicative project budget" value={ARCH_REQUEST.budget} />
              <FieldBox label="Preferred consultation format" value="Video consultation" />
              <FieldBox label="Preferred date" value="21 Oct 2026" />
              <FieldBox label="Preferred time (WAT)" value="02:00–03:00 PM · Requested" />
            </dl>
            <dl className="contents">
              <FieldBox
                label="Preferred contact"
                value={ARCH_REQUEST.preferredContact}
                hint="Your personal contact is shared only as needed with your consent."
              />
            </dl>

            <div className="flex flex-col items-center gap-1 rounded-[var(--radius-field)] border border-dashed border-line2 bg-surface2 p-6 text-center">
              <UploadCloud aria-hidden className="size-6 text-muted" />
              <p className="text-[14px] font-semibold text-ink">Attach plans or inspiration</p>
              <p className="text-[12px] text-muted">PDF, JPG or PNG · Up to 10 MB each</p>
            </div>
            <p className="text-[12px] text-muted">
              {ARCH_REQUEST.attachment} ·{" "}
              <button type="button" className="font-semibold text-primary-text underline underline-offset-4">
                Remove
              </button>
            </p>

            {/* The brief and its attachment leave the platform, so consent to
                share is explicit and unticked rather than assumed. */}
            <Checkbox
              name="share"
              required
              label="I agree to share this brief and attachment with the selected demo professional."
            />

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Send consultation request
              </Button>
              <ButtonLink
                href="/app/services/architects"
                variant="ghost"
                size="md"
                className="border-line2"
              >
                Cancel request
              </ButtonLink>
            </div>
            <p className="text-[12px] leading-relaxed text-muted">
              No payment is required to submit this illustrative request. A date is not booked
              until explicitly confirmed.
            </p>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
