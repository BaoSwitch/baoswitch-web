"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type ApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

/** Milliseconds until the next refresh, given the latest answer; 0 stops. Pass
 *  a function that lives outside the component so it stays the same between
 *  renders. */
export type PollFn<T> = (data: T | null) => number;

/** GETs a Baoswitch API path through this app's /api/v1 proxy. A 401 means the
 *  session is gone, so the person goes back to sign in. With `poll`, it
 *  refreshes itself quietly (no loading flash) after each answer. */
export function useApi<T>(path: string, poll?: PollFn<T>): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const ctl = new AbortController();
    fetch(`/api/v1${path}`, { signal: ctl.signal, cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/login?e=SESSION_EXPIRED");
          return;
        }
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new Error(body?.message ?? "Something went wrong.");
        setData(body as T);
        setError(null);
      })
      .catch((err: unknown) => {
        if ((err as Error).name !== "AbortError") setError((err as Error).message);
      })
      .finally(() => {
        if (!ctl.signal.aborted) setLoading(false);
      });
    return () => ctl.abort();
  }, [path, tick, router]);

  useEffect(() => {
    const ms = poll?.(data) ?? 0;
    if (ms <= 0) return;
    const id = window.setTimeout(() => setTick((t) => t + 1), ms);
    return () => window.clearTimeout(id);
  }, [data, error, poll]);

  return { data, error, loading, reload: useCallback(() => {
      setLoading(true);
      setTick((t) => t + 1);
    }, []) };
}

export type Wallet = {
  available_kobo: number;
  held_kobo: number;
  frozen_kobo: number;
  limits?: {
    min_kobo: number;
    per_deposit_kobo: number;
    daily_kobo: number;
    balance_cap_kobo: number;
    remaining_today_kobo: number;
  };
};

export type DedicatedAccount = {
  status: "NONE" | "PENDING" | "ACTIVE" | "FAILED";
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  bvn_last4?: string;
  failure_reason?: string;
  attempts_left?: number;
  /** The transfer fee in basis points (100 = 1%), and its cap in kobo. */
  fee_bps?: number;
  fee_cap_kobo?: number;
  /** True when the form would also need the person's own bank account. Only
   *  Paystack asks for that; this app is Monnify-only and never does. */
  requires_bank_account?: boolean;
};

export type DepositStatus = "PENDING" | "SUCCESS" | "FAILED" | "ABANDONED" | "HELD" | "REVIEW";

/** One top-up. For a bank transfer, amount_kobo is what reached the wallet
 *  (the transfer minus the gateway fee) and charge_kobo is what was sent. */
export type Deposit = {
  reference: string;
  status: DepositStatus;
  amount_kobo: number;
  fee_kobo: number;
  charge_kobo: number;
  channel?: string;
  paid_at?: string;
  created_at: string;
};

/** Kobo (what the API speaks) to naira for display. Never the other way by
 *  float maths: amounts sent to the API stay integer kobo. */
export const naira = (kobo: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(kobo / 100);

/** Lagos time, which is what a bank statement will show. */
export const lagosTime = (iso: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date(iso));
