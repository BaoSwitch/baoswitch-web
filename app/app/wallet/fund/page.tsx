import type { Metadata } from "next";
import { Copy } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, RailLink, DetailRow, FieldBox, Timeline } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { ButtonLink } from "@/components/ui/button";
import { WALLET, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Fund your wallet" };

export default function FundWalletPage() {
  return (
    <>
      <PageHeader back="My wallet" backHref="/app/wallet" title="Fund your wallet" />

      <SplitBody
        rail={
          <>
            <Panel title="How it works">
              <Timeline
                steps={[
                  { label: "Copy the demo account details", state: "done" },
                  { label: "Transfer from your banking app", state: "done" },
                  { label: "Wait for confirmation", state: "current" },
                ]}
              />
            </Panel>

            <Panel title="Current wallet">
              <dl>
                <DetailRow label="Available" value={money(WALLET.available)} />
                <DetailRow label={`Held for ${WALLET.heldFor}`} value={money(WALLET.held)} />
              </dl>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">
                Your existing hold is separate from incoming funding.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/support">Need funding help? In-app support</RailLink>
            </Panel>
          </>
        }
      >
        <Panel title="Bank transfer" aside={<DemoChip>Demo bank details</DemoChip>}>
          <dl className="flex flex-col gap-4">
            <div>
              <dt className="text-[13px] text-muted">Bank</dt>
              <dd className="text-[15px] font-medium text-ink">{WALLET.bank}</dd>
            </div>
            <div>
              <dt className="sr-only">Dedicated virtual account number</dt>
              <dd className="flex flex-wrap items-center gap-4">
                <span className="num text-[clamp(1.75rem,1.4rem+1.3vw,2.25rem)] leading-none font-semibold text-primary-text">
                  {WALLET.accountNumber}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
                >
                  <Copy aria-hidden className="size-4" />
                  Copy
                </button>
              </dd>
            </div>
            <div>
              <dt className="text-[13px] text-muted">Account name</dt>
              <dd className="text-[15px] font-medium text-ink">{WALLET.accountName}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[12px] text-muted">
            Sample account only. Do not send real money to these details.
          </p>

          <dl className="mt-6 flex flex-col gap-4">
            <FieldBox
              label="Amount you plan to transfer"
              value={money(WALLET.pendingIncoming)}
              hint="This amount helps you track the transfer; it does not initiate a debit."
            />
            <FieldBox
              label="Transfer narration / reference"
              value="Wallet funding · Ada"
              hint="Keep your bank’s transfer reference or receipt for support."
            />
          </dl>

          {/* The distinction this box draws is the whole screen: pressing the
              button below records that *you* sent money, which is not the
              same event as the wallet being credited. */}
          <Notice className="mt-5" tone="warning" title="Wallet credit requires confirmation">
            Sending money from your bank is not the same as a wallet credit. Your available
            balance changes only after the incoming transfer is confirmed.
          </Notice>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ButtonLink href="/app/wallet/status" size="md">
              I&rsquo;ve sent the money
            </ButtonLink>
            <ButtonLink href="/app/wallet" variant="ghost" size="md" className="border-line2">
              Back to wallet
            </ButtonLink>
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
