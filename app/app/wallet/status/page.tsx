import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, RailLink, DetailRow, Timeline } from "@/components/app/ui";
import { StatusPill } from "@/components/ui/status";
import { ButtonLink } from "@/components/ui/button";
import { WALLET, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Track wallet funding" };

/**
 * Funding status.
 *
 * The frame heads this screen "Transfer Successful!" with a green tick and a
 * "Credited" chip — and then, four lines down, says the credit has not
 * arrived, the wallet is unchanged, and the incoming amount is excluded. On
 * a payments product that headline is not a wording slip: someone reads
 * "Successful", believes the money landed, and acts on it.
 *
 * The page now says what its own body says. Tick becomes a clock, "Credited"
 * becomes "Awaiting confirmation", and the headline names the real state.
 */
export default function FundingStatusPage() {
  return (
    <>
      <PageHeader back="My wallet" backHref="/app/wallet" title="Track wallet funding" />

      <SplitBody
        rail={
          <>
            <Panel title="Funding timeline">
              <Timeline
                steps={[
                  {
                    label: "Transfer marked as sent",
                    detail: "11:05 AM · Reported by you. Not a bank confirmation.",
                    state: "done",
                  },
                  {
                    label: "Awaiting incoming confirmation",
                    detail: "11:07 AM · No matching confirmed credit yet.",
                    state: "current",
                  },
                  { label: "Wallet credited", state: "upcoming" },
                ]}
              />
            </Panel>

            <Panel title="Transfer still missing?">
              <p className="text-[13px] leading-relaxed text-muted">
                Keep the bank receipt and transfer reference. Share them through in-app support so
                the transfer can be investigated.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/support/report">Report a funding issue</RailLink>
              <p className="mt-3 text-[12px] text-muted">
                No fixed credit time is promised in this demo.
              </p>
            </Panel>
          </>
        }
      >
        <Panel>
          <span
            aria-hidden
            className="flex size-14 items-center justify-center rounded-full bg-warning-soft text-warning"
          >
            <Clock className="size-7" />
          </span>
          <h2 className="mt-5 text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] font-semibold text-primary-text">
            Transfer reported — awaiting confirmation
          </h2>
          <p className="mt-3">
            <StatusPill status="pending" label="Awaiting confirmation" />
          </p>
          <p className="mt-4 text-[15px] text-muted">
            Incoming amount{" "}
            <span className="num font-semibold text-ink">{money(WALLET.pendingIncoming)}</span>
          </p>

          <hr className="bs-rule my-5" />

          <dl>
            <DetailRow label="Funding reference" value="FND-261018-1105" />
            <DetailRow label="Transfer marked as sent" value="18 Oct 2026 · 11:05 AM WAT" />
            <DetailRow label="Destination" value={`${WALLET.bank} · ••••6789`} />
            <DetailRow label="Account name" value={WALLET.accountName} />
            <DetailRow label="Last checked" value="18 Oct 2026 · 11:07 AM WAT" />
          </dl>

          <Notice className="mt-5" tone="warning" title={`Available wallet remains ${money(WALLET.available)}`}>
            This incoming {money(WALLET.pendingIncoming)} is excluded until confirmation. Do not
            send another transfer simply because this one is still processing.
          </Notice>

          <div className="mt-5">
            <ButtonLink href="/app/wallet" size="md">
              Return to wallet
            </ButtonLink>
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
