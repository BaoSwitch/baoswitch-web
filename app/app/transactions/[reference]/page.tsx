import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Download, Share2, XCircle } from "lucide-react";
import {
  PageHeader,
  Panel,
  SplitBody,
  Notice,
  DetailRow,
  RailLink,
  Timeline,
} from "@/components/app/ui";
import { StatusPill } from "@/components/ui/status";
import { TokenReveal } from "@/components/app/token-reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import { TRANSACTIONS, WALLET, money } from "@/lib/app-data";
import { TX_DETAILS } from "@/lib/tx-details";

export function generateStaticParams() {
  return TRANSACTIONS.map((tx) => ({ reference: tx.reference }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  return { title: TX_DETAILS[reference]?.heading ?? "Transaction" };
}

const ICON = {
  successful: { Icon: CheckCircle2, className: "bg-success-soft text-success" },
  pending: { Icon: Clock, className: "bg-warning-soft text-warning" },
  failed: { Icon: XCircle, className: "bg-error-soft text-error" },
} as const;

/**
 * One transaction, in whichever state it is in.
 *
 * The frames draw "successful", "pending", "failed" and the electricity
 * token as four separate screens. They are one screen with four states —
 * which is how a reference actually behaves, so a link someone saved while
 * a payment was pending still resolves once it settles.
 */
export default async function TransactionPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const tx = TRANSACTIONS.find((t) => t.reference === reference);
  const detail = TX_DETAILS[reference];
  if (!tx || !detail) notFound();

  const { Icon, className } = ICON[tx.status];

  return (
    <>
      <PageHeader
        back="Transaction history"
        backHref="/app/transactions"
        title={detail.token ? "Electricity payment details" : "Payment receipt"}
      />

      <SplitBody
        rail={
          <>
            <Panel title={detail.timeline.title}>
              <Timeline steps={detail.timeline.steps} />
            </Panel>

            {detail.token ? (
              <Panel title="Secure service outputs">
                <p className="text-[13px] leading-relaxed text-muted">
                  Prepaid electricity tokens appear here after success. Other services, such as
                  exam PINs, use secure reveal for private serials and PINs rather than public
                  notifications.
                </p>
                <hr className="bs-rule my-4" />
                <RailLink href="/app/support">Token help and troubleshooting</RailLink>
              </Panel>
            ) : null}

            {tx.status === "pending" ? (
              <Panel title="How the hold works">
                <dl>
                  <DetailRow label="Available to spend" value={money(WALLET.available)} />
                  <DetailRow label="Held separately" value={money(WALLET.held)} />
                </dl>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  The available balance already excludes this hold. A pending status is not a
                  success.
                </p>
                <hr className="bs-rule my-4" />
                <RailLink href="/app/support/report">Report a transaction issue</RailLink>
              </Panel>
            ) : null}

            {tx.status === "failed" ? (
              <Panel title="Before another attempt">
                <p className="text-[13px] leading-relaxed text-muted">
                  Confirm the recipient number and network. A retry creates a new transaction with
                  its own reference.
                </p>
                <hr className="bs-rule my-4" />
                <RailLink href="/app/support/report">Report an unexpected debit</RailLink>
              </Panel>
            ) : null}

            {tx.status === "successful" && !detail.token ? (
              <Panel title="Wallet after payment">
                <dl>
                  <DetailRow label="Available balance" value={money(WALLET.available)} />
                  <DetailRow label="Separate pending hold" value={money(WALLET.held)} />
                </dl>
                <hr className="bs-rule my-4" />
                <RailLink href="/app/wallet">Open my wallet</RailLink>
              </Panel>
            ) : null}
          </>
        }
      >
        <Panel>
          <span
            aria-hidden
            className={`flex size-14 items-center justify-center rounded-full ${className}`}
          >
            <Icon className="size-7" />
          </span>
          <h2 className="mt-5 text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] font-semibold text-primary-text">
            {detail.heading}
          </h2>
          {detail.blurb ? <p className="mt-2 text-[15px] text-muted">{detail.blurb}</p> : null}
          <p className="mt-3">
            <StatusPill status={tx.status} label={detail.statusLabel} />
          </p>
          <p className="mt-4 text-[15px] text-muted">
            {detail.amountLabel}{" "}
            <span className="num text-[18px] font-semibold text-ink">{money(tx.amount)}</span>
          </p>

          <hr className="bs-rule my-5" />

          <dl>
            {detail.rows.map((row) => (
              <DetailRow key={row.label} label={row.label} value={row.value} />
            ))}
            <DetailRow label="Transaction reference" value={tx.reference} />
          </dl>

          {detail.warning ? (
            <Notice className="mt-5" tone={detail.warning.tone} title={detail.warning.title}>
              {detail.warning.body}
            </Notice>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {tx.status === "successful" ? (
              <>
                <Button type="button" variant="ghost" size="md" className="border-line2">
                  <Download aria-hidden className="size-4" />
                  Download receipt
                </Button>
                {!detail.token ? (
                  <Button type="button" variant="ghost" size="md" className="border-line2">
                    <Share2 aria-hidden className="size-4" />
                    Share receipt
                  </Button>
                ) : (
                  <ButtonLink href="/app/support/report" variant="ghost" size="md" className="border-line2">
                    Report an issue
                  </ButtonLink>
                )}
              </>
            ) : null}
            {tx.status === "pending" ? (
              <>
                <Button type="button" size="md">
                  Check payment status
                </Button>
                <ButtonLink href="/app/transactions" variant="ghost" size="md" className="border-line2">
                  Return to transactions
                </ButtonLink>
              </>
            ) : null}
            {tx.status === "failed" ? (
              <>
                <ButtonLink href="/app/pay/airtime" size="md">
                  Edit &amp; retry purchase
                </ButtonLink>
                <ButtonLink href="/app/transactions" variant="ghost" size="md" className="border-line2">
                  Back to transactions
                </ButtonLink>
              </>
            ) : null}
          </div>
        </Panel>

        {detail.token ? (
          <Panel title="Prepaid electricity token">
            <TokenReveal value={detail.token.value} note={detail.token.note} />
            <Notice className="mt-4" title="Use the matching prepaid meter">
              Enter a genuine token only on the meter it was issued for. If a token is missing or
              rejected, report this payment through in-app support.
            </Notice>
          </Panel>
        ) : null}

        {tx.status === "successful" && !detail.token ? (
          <Panel title="Make next time simpler">
            <p className="text-[13px] leading-relaxed text-muted">
              Save this recipient so a repeat payment takes two taps. Only the masked recipient is
              included in this receipt preview.
            </p>
            <div className="mt-4">
              <Button type="button" variant="ghost" size="md" className="border-line2">
                Save beneficiary
              </Button>
            </div>
          </Panel>
        ) : null}
      </SplitBody>
    </>
  );
}
