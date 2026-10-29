import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, Notice, DetailRow, Timeline } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Button } from "@/components/ui/button";
import { ARCH_REQUEST } from "@/lib/services-data";

export const metadata: Metadata = { title: "Architecture request tracking" };

export default function ArchRequestPage() {
  return (
    <>
      <PageHeader
        back="Hire an architect"
        backHref="/app/services/architects"
        title="Architecture request tracking"
      />

      <SplitBody
        rail={
          <>
            <Panel title="Request timeline">
              <Timeline
                steps={[
                  { label: "Request submitted", detail: ARCH_REQUEST.submitted, state: "done" },
                  {
                    label: "Awaiting professional response",
                    detail: "The brief and requested time are under consideration.",
                    state: "current",
                  },
                  {
                    label: "Discuss scope and consultation",
                    detail: "Confirm the time together in messages.",
                    state: "upcoming",
                  },
                  {
                    label: "Quote and agreement",
                    detail: "Review any proposed scope and fees before acceptance.",
                    state: "upcoming",
                  },
                ]}
              />
            </Panel>

            <Panel title="Consultation next steps">
              <dl>
                <DetailRow label="Preferred contact" value={ARCH_REQUEST.preferredContact} />
                <DetailRow label="Requested time" value={ARCH_REQUEST.requestedTime} />
                <DetailRow label="Booking status" value="Awaiting confirmation" />
                <DetailRow label="Quote status" value="Not yet issued" />
                <DetailRow label="Payment status" value="No payment requested yet" />
              </dl>
              <Notice className="mt-4" tone="warning" title="No engagement confirmed">
                A submitted request does not reserve a slot or create a paid engagement.
              </Notice>
            </Panel>
          </>
        }
      >
        <Panel
          title={ARCH_REQUEST.title}
          aside={<DemoChip>Submitted · awaiting response</DemoChip>}
        >
          <dl>
            <DetailRow label="Request ID" value={ARCH_REQUEST.id} />
            <DetailRow label="Submitted" value={ARCH_REQUEST.submitted} />
            <DetailRow
              label="Selected professional"
              value={`${ARCH_REQUEST.professional} · Demo profile`}
            />
            <DetailRow label="Scope / location" value={ARCH_REQUEST.scope} />
            <DetailRow label="Indicative project budget" value={ARCH_REQUEST.budget} />
          </dl>

          <hr className="bs-rule my-5" />

          <h3 className="font-semibold text-primary-text">Project brief</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{ARCH_REQUEST.brief}</p>
          <p className="mt-3 text-[13px] text-muted">Attachment · {ARCH_REQUEST.attachment}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button type="button" size="md">
              Update request
            </Button>
            <Button type="button" variant="ghost" size="md" className="border-line2">
              Request cancellation
            </Button>
          </div>
        </Panel>

        <Panel title="Project messages">
          <Notice title="Request received by the platform">
            18 Oct · 11:20 AM WAT · Your brief has been recorded. A professional response has not
            yet been received in this demo.
          </Notice>

          <form className="mt-4 flex flex-col gap-3" action="/app/services/architects/requests">
            <label htmlFor="arch-msg" className="text-[13px] font-medium text-muted">
              Message to the professional
            </label>
            <textarea
              id="arch-msg"
              name="message"
              rows={3}
              placeholder="Enter an update or a question about your project"
              className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] text-ink placeholder:text-muted focus-visible:border-primary"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Send message
              </Button>
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Attach file
              </Button>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
