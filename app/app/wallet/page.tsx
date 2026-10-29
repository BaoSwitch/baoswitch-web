import type { Metadata } from "next";
import Link from "next/link";
import { Copy, Download, Plus } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, RailLink, DetailRow } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { FUNDING_HISTORY, WALLET, money } from "@/lib/app-data";

export const metadata: Metadata = { title: "My wallet" };

export default function WalletPage() {
  return (
    <>
      <PageHeader back="Overview" backHref="/app" title="My wallet" />

      <SplitBody
        rail={
          <>
            <Panel title="Dedicated virtual account" aside={<DemoChip>Demo bank details</DemoChip>}>
              <dl className="flex flex-col gap-3">
                <div>
                  <dt className="text-[13px] text-muted">Bank</dt>
                  <dd className="text-[15px] font-medium text-ink">{WALLET.bank}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-muted">Dedicated virtual account</dt>
                  <dd className="mt-1 flex items-center gap-3">
                    <span className="num text-[clamp(1.25rem,1rem+0.9vw,1.625rem)] font-semibold text-primary-text">
                      {WALLET.accountNumber}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink">
                      <Copy aria-hidden className="size-3.5" />
                      Copy
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[13px] text-muted">Account name</dt>
                  <dd className="text-[15px] font-medium text-ink">{WALLET.accountName}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[12px] leading-relaxed text-muted">
                Sample account only. Do not send real money to these details.
              </p>
            </Panel>

            <Panel title="Understand your balance">
              <p className="text-[13px] leading-relaxed text-muted">
                Available funds can be spent now. Held funds are reserved while a payment awaits
                its provider&rsquo;s response.
              </p>
              <dl className="mt-3">
                <DetailRow label="Pending incoming transfer" value={money(WALLET.pendingIncoming)} />
              </dl>
              <p className="text-[12px] text-muted">Not included in your wallet until confirmed.</p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/transactions/BSW-261018-0838">View pending DStv payment</RailLink>
            </Panel>
          </>
        }
      >
        <section className="rounded-[var(--radius-card-lg,26px)] bg-primary p-6 text-white shadow-e2 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="text-[15px] text-white/90">Available wallet balance · NGN</h2>
            <Link
              href="/app/wallet/fund"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-primary-text transition-colors hover:bg-primary-soft"
            >
              <Plus aria-hidden className="size-4" />
              Fund wallet
            </Link>
          </div>
          <p className="mt-2 text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] leading-none font-semibold">
            {money(WALLET.available)}
          </p>
          <p className="mt-4 text-[13px] text-white/90">
            {money(WALLET.held)} held for {WALLET.heldFor} · Not available to spend
          </p>
          <p className="mt-1 text-[13px] text-white/90">
            Total wallet funds including hold: {money(WALLET.total)}
          </p>
        </section>

        <Panel
          title="Funding history"
          lead="Wallet credits only · October 2026"
          aside={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
            >
              <Download aria-hidden className="size-4" />
              Download statement
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">
              <caption className="sr-only">Wallet credits for October 2026</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-3 pr-4 font-semibold tracking-wide text-muted uppercase">
                    Transfer / reference
                  </th>
                  <th scope="col" className="py-3 pr-4 text-right font-semibold tracking-wide text-muted uppercase">
                    Amount
                  </th>
                  <th scope="col" className="py-3 font-semibold tracking-wide text-muted uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {FUNDING_HISTORY.map((row) => (
                  <tr key={row.reference} className="border-b border-line last:border-0">
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <span className="block text-ink">
                        {row.date} · {row.time}
                      </span>
                      <span className="num block text-[12px] text-muted">{row.reference}</span>
                    </th>
                    <td className="num py-4 pr-4 text-right font-semibold whitespace-nowrap text-ink">
                      {money(row.amount)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
                          row.status === "credited"
                            ? "bg-success-soft text-success"
                            : "bg-warning-soft text-warning"
                        }`}
                      >
                        {row.status === "credited" ? "Credited" : "Awaiting confirmation"}
                      </span>
                      <Link
                        href="/app/wallet/status"
                        className="mt-1.5 block text-[12px] font-semibold text-primary-text underline-offset-4 hover:underline"
                      >
                        View details
                        <span className="sr-only"> for {row.reference}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Notice tone="warning" title="A sent transfer is not yet a wallet credit">
          Your available balance changes only after an incoming transfer is confirmed.
        </Notice>
      </SplitBody>
    </>
  );
}
