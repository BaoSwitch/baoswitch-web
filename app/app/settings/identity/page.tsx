import type { Metadata } from "next";
import { UploadCloud } from "lucide-react";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, RailLink, Timeline } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Button, ButtonLink } from "@/components/ui/button";
import { USER } from "@/lib/app-data";

export const metadata: Metadata = { title: "Identity verification" };

export default function IdentityVerificationPage() {
  return (
    <>
      <PageHeader
        back="Profile & account settings"
        backHref="/app/settings"
        title="Identity verification"
      />

      {/* The frame flags this explicitly, and it is worth keeping: the rest
          of the demo shows Ada as a verified account, while this screen
          illustrates a pending-review state. Without the banner the two
          contradict each other. */}
      <Notice className="mb-5" tone="warning" title="Illustrative onboarding state">
        This screen shows a separate pending-review example, not a change to {USER.firstName}
        &rsquo;s verified dashboard profile. No verification approval is implied.
      </Notice>

      <SplitBody
        rail={
          <>
            <Panel title="Verification progress">
              <Timeline
                steps={[
                  { label: "Contact verified", state: "done" },
                  { label: "Information submitted", state: "done" },
                  { label: "Review in progress", state: "current" },
                  { label: "Decision", state: "upcoming" },
                ]}
              />
            </Panel>

            <Notice title="Why we ask">
              Identity details help protect your account. Only submit documents through this
              secure account area, not in a support message.
            </Notice>

            <Panel title="Need to correct something?">
              <p className="text-[13px] leading-relaxed text-muted">
                If a detail is wrong, update it here before the review completes.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/support">Ask in-app support</RailLink>
            </Panel>
          </>
        }
      >
        <Panel
          title="Your verification information"
          aside={<DemoChip>Pending review · demo</DemoChip>}
        >
          <form className="flex flex-col gap-4" action="/app/settings" method="get">
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox label="Legal first name" value={USER.firstName} />
              <FieldBox label="Legal last name" value={USER.lastName} />
              <FieldBox label="Date of birth" value="•• / •• / ••••" />
              <FieldBox label="Nationality" value="Nigerian" />
            </dl>
            <dl className="contents">
              <FieldBox
                label="Residential address"
                value="••• Example Close, Ikeja, Lagos"
                hint="Demo address shown. Use your current residential address."
              />
            </dl>
            <dl className="grid gap-4 sm:grid-cols-2">
              <FieldBox label="Document type" value="National identity document" />
              <FieldBox
                label="Document number"
                value="•••••••••••"
                hint="Hidden after submission."
              />
            </dl>

            <div className="flex flex-col items-center gap-1 rounded-[var(--radius-field)] border border-dashed border-line2 bg-surface2 p-6 text-center">
              <UploadCloud aria-hidden className="size-6 text-muted" />
              <p className="text-[14px] font-semibold text-ink">
                Upload or replace identity document
              </p>
              <p className="text-[12px] text-muted">
                JPG, PNG or PDF · Up to 5 MB · Clear, complete document
              </p>
            </div>

            <p className="text-[12px] text-muted">
              identity-document-demo.pdf · Uploaded 18 Oct 2026 ·{" "}
              <button type="button" className="font-semibold text-primary-text underline underline-offset-4">
                Replace file
              </button>
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Save updated information
              </Button>
              <ButtonLink href="/app/settings" variant="ghost" size="md" className="border-line2">
                Return to profile
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
