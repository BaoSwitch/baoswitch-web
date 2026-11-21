"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Check, Copy } from "lucide-react";
import { Panel, SplitBody, Notice, RailLink, DetailRow, Timeline } from "@/components/app/ui";
import { DepositList } from "@/components/app/deposit-list";
import { Button } from "@/components/ui/button";
import { Checkbox, Field } from "@/components/ui/field";
import {
  naira,
  useApi,
  type DedicatedAccount,
  type Deposit,
  type PollFn,
  type Wallet,
} from "@/lib/use-api";

/*
 * Funding by bank transfer, through the person's own account number
 * (Monnify reserved account).
 *
 * The account number is created once, from the person's BVN and their
 * consent. The BVN goes to the API and from there straight to Monnify; this
 * screen keeps it only in the input while it is typed, clears it as soon as
 * the answer comes back, and never writes it anywhere else. Only the last
 * four digits come back, so the person can recognise what they submitted.
 *
 * Nothing here says money has arrived on the person's word. The wallet is
 * credited by the server after the bank confirms, and this screen only shows
 * what the API reports.
 */

// Module-level so the hook sees the same function on every render.
const pollAccount: PollFn<DedicatedAccount> = (a) => (a?.status === "PENDING" ? 3000 : 0);
const pollLive = () => 6000;

export function FundWallet() {
  const account = useApi<DedicatedAccount>("/wallet/account", pollAccount);
  const wallet = useApi<Wallet>("/wallet", pollLive);
  const deposits = useApi<{ deposits: Deposit[] }>("/wallet/deposits?limit=5", pollLive);

  const a = account.data;
  const active = a?.status === "ACTIVE" ? a : null;
  const list = deposits.data?.deposits ?? [];
  const credited = list.some((d) => d.status === "SUCCESS");

  return (
    <SplitBody
      rail={
        <>
          <Panel title="How it works">
            <Timeline
              steps={[
                {
                  label: "Get your account number",
                  detail: "One time, with your BVN.",
                  state: active ? "done" : "current",
                },
                {
                  label: "Transfer from your banking app",
                  detail: "Any Nigerian bank, any time.",
                  state: !active ? "upcoming" : credited || list.length > 0 ? "done" : "current",
                },
                {
                  label: "We credit your wallet",
                  detail: "Automatically, once the bank confirms.",
                  state: credited ? "done" : active && list.length > 0 ? "current" : "upcoming",
                },
              ]}
            />
          </Panel>

          <Panel title="Current wallet">
            {wallet.data ? (
              <dl>
                <DetailRow label="Available" value={naira(wallet.data.available_kobo)} />
                <DetailRow label="Held for payments" value={naira(wallet.data.held_kobo)} />
              </dl>
            ) : (
              <p className="text-[13px] text-muted">{wallet.error ?? "Loading…"}</p>
            )}
            <hr className="bs-rule my-4" />
            <RailLink href="/app/support">Need funding help? In-app support</RailLink>
          </Panel>
        </>
      }
    >
      {account.loading && !a ? (
        <Panel title="Bank transfer">
          <p className="text-[14px] text-muted">Loading your account…</p>
        </Panel>
      ) : account.error && !a ? (
        <Panel title="Bank transfer">
          <Notice tone="error" title="We couldn’t load your funding details">
            {account.error}
          </Notice>
          <Button className="mt-4" variant="outline" onClick={account.reload}>
            Try again
          </Button>
        </Panel>
      ) : a?.requires_bank_account ? (
        <Panel title="Bank transfer">
          <Notice tone="warning" title="Funding isn’t available right now">
            Please try again later or contact support.
          </Notice>
        </Panel>
      ) : active ? (
        <AccountDetails account={active} wallet={wallet.data} />
      ) : a?.status === "PENDING" ? (
        <Panel title="Setting up your account number">
          <Notice tone="warning" title="This usually takes a few seconds">
            We’re creating your account number. This page updates by itself.
          </Notice>
        </Panel>
      ) : (
        <RequestAccount account={a} onDone={account.reload} />
      )}

      <Panel
        title="Recent top-ups"
        aside={
          <Link href="/app/wallet/status" className="text-[13px] font-medium text-primary-text hover:underline">
            All funding activity
          </Link>
        }
      >
        {deposits.loading && !deposits.data ? (
          <p className="text-[14px] text-muted">Loading…</p>
        ) : deposits.error && !deposits.data ? (
          <p role="alert" className="text-[14px] text-error">
            {deposits.error}
          </p>
        ) : (
          <DepositList deposits={list} />
        )}
      </Panel>
    </SplitBody>
  );
}

/* ------------------------------------------------------- account details */

function AccountDetails({ account, wallet }: { account: DedicatedAccount; wallet: Wallet | null }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (account.account_number) await navigator.clipboard.writeText(account.account_number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number stays visible and selectable.
    }
  }

  const feePct = account.fee_bps ? `${account.fee_bps / 100}%` : null;
  const l = wallet?.limits;

  return (
    <Panel title="Bank transfer" lead="Send money to this account from any bank. It’s yours alone.">
      <dl className="flex flex-col gap-4">
        <div>
          <dt className="text-[13px] text-muted">Bank</dt>
          <dd className="text-[15px] font-medium text-ink">{account.bank_name}</dd>
        </div>
        <div>
          <dt className="sr-only">Your account number</dt>
          <dd className="flex flex-wrap items-center gap-4">
            <span className="num text-[clamp(1.75rem,1.4rem+1.3vw,2.25rem)] leading-none font-semibold text-primary-text">
              {account.account_number}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-[var(--radius-chip)] border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-line2"
            >
              {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
              {copied ? "Copied" : "Copy"}
              <span className="sr-only"> account number</span>
            </button>
          </dd>
        </div>
        <div>
          <dt className="text-[13px] text-muted">Account name</dt>
          <dd className="text-[15px] font-medium text-ink">{account.account_name}</dd>
        </div>
      </dl>

      <Notice className="mt-5" tone="info" title="Your wallet is credited after the bank confirms">
        {feePct ? (
          <>
            A fee of {feePct}
            {account.fee_cap_kobo ? ` (never more than ${naira(account.fee_cap_kobo)})` : ""} is taken from
            each transfer, so you receive the amount you send minus that fee.{" "}
          </>
        ) : null}
        {l ? (
          <>
            A transfer that is over {naira(l.per_deposit_kobo)} at once, over {naira(l.daily_kobo)} in a
            day, or that would take your balance over {naira(l.balance_cap_kobo)} is held for review
            instead of being credited.
          </>
        ) : null}
      </Notice>
    </Panel>
  );
}

/* ------------------------------------------------------ get an account */

function RequestAccount({ account, onDone }: { account: DedicatedAccount | null; onDone: () => void }) {
  const router = useRouter();
  const [bvn, setBvn] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const failed = account?.status === "FAILED";
  const valid = /^[0-9]{11}$/.test(bvn) && consent;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/wallet/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bvn, consent }),
      });
      if (res.status === 401) {
        router.replace("/login?e=SESSION_EXPIRED");
        return;
      }
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setError(body?.message ?? "Something went wrong. Please try again.");
        return;
      }
      onDone();
    } catch {
      setError("We couldn’t reach the server. Check your connection and try again.");
    } finally {
      setBvn(""); // never keep it longer than the request
      setBusy(false);
    }
  }

  return (
    <Panel
      title="Get your account number"
      lead="Your own bank account number for topping up your wallet by transfer."
    >
      {failed && account?.failure_reason ? (
        <Notice className="mb-5" tone="error" title="We couldn’t set up your account number">
          {account.failure_reason}
          {typeof account.attempts_left === "number" ? ` You have ${account.attempts_left} tries left.` : ""}
        </Notice>
      ) : null}

      <form onSubmit={submit} className="flex max-w-md flex-col gap-5" noValidate>
        <Field
          label="Your BVN"
          hint="11 digits. Dial *565*0# on your phone to see it."
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={11}
          value={bvn}
          onChange={(e) => setBvn(e.target.value.replace(/\D/g, ""))}
        />
        <Checkbox
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          label="I agree to share my BVN with Baoswitch’s payment partner, Monnify, to get an account number in my name."
        />
        {error ? (
          <p role="alert" className="text-[13px] text-error">
            {error}
          </p>
        ) : null}
        <div>
          <Button type="submit" disabled={!valid || busy}>
            {busy ? "Getting your account…" : "Get my account number"}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-[12px] leading-relaxed text-muted">
        We don’t store your BVN. It goes straight to our payment partner to verify you, and we keep only
        its last four digits and the time you agreed.
      </p>
    </Panel>
  );
}
