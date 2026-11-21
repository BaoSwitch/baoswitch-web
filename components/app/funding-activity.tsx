"use client";

import { Panel, SplitBody, RailLink, DetailRow, Notice } from "@/components/app/ui";
import { DepositList } from "@/components/app/deposit-list";
import { Button, ButtonLink } from "@/components/ui/button";
import { naira, useApi, type Deposit, type PollFn, type Wallet } from "@/lib/use-api";

const pollLive = () => 6000;
const pollOpen: PollFn<{ deposits: Deposit[] }> = () => 6000;

/** Every top-up with what the server says about it, refreshed while open. */
export function FundingActivity() {
  const deposits = useApi<{ deposits: Deposit[] }>("/wallet/deposits?limit=20", pollOpen);
  const wallet = useApi<Wallet>("/wallet", pollLive);
  const list = deposits.data?.deposits ?? [];
  const waiting = list.some((d) => d.status === "PENDING");

  return (
    <SplitBody
      rail={
        <>
          <Panel title="Current wallet">
            {wallet.data ? (
              <dl>
                <DetailRow label="Available" value={naira(wallet.data.available_kobo)} />
                <DetailRow label="Held for payments" value={naira(wallet.data.held_kobo)} />
              </dl>
            ) : (
              <p className="text-[13px] text-muted">{wallet.error ?? "Loading…"}</p>
            )}
          </Panel>
          <Panel title="Transfer still missing?">
            <p className="text-[13px] leading-relaxed text-muted">
              Keep the bank receipt and transfer reference. Share them through in-app support so the
              transfer can be investigated.
            </p>
            <hr className="bs-rule my-4" />
            <RailLink href="/app/support/report">Report a funding issue</RailLink>
          </Panel>
        </>
      }
    >
      <Panel
        title="Funding activity"
        lead="This page checks for updates by itself."
        aside={
          <Button variant="outline" size="sm" onClick={deposits.reload}>
            Check now
          </Button>
        }
      >
        {waiting ? (
          <Notice className="mb-5" tone="warning" title="A transfer is still being confirmed">
            Your balance changes only after the bank confirms. Please don’t send it again.
          </Notice>
        ) : null}
        {deposits.loading && !deposits.data ? (
          <p className="text-[14px] text-muted">Loading…</p>
        ) : deposits.error && !deposits.data ? (
          <p role="alert" className="text-[14px] text-error">
            {deposits.error}
          </p>
        ) : (
          <DepositList deposits={list} />
        )}
        <div className="mt-5">
          <ButtonLink href="/app/wallet/fund" variant="outline" size="md">
            Back to funding
          </ButtonLink>
        </div>
      </Panel>
    </SplitBody>
  );
}
