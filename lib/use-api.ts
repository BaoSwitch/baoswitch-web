"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type ApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

/** GETs a Baoswitch API path through this app's /api/v1 proxy. A 401 means the
 *  session is gone, so the person goes back to sign in. */
export function useApi<T>(path: string): ApiState<T> {
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
};

/** Kobo (what the API speaks) to naira for display. Never the other way by
 *  float maths: amounts sent to the API stay integer kobo. */
export const naira = (kobo: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(kobo / 100);
