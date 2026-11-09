"use client";

import { Panel, RailLink } from "@/components/app/ui";
import { naira, useApi, type Wallet } from "@/lib/use-api";

/**
 * The "Your wallet" rail card that sits beside the Pay bills hub and every
 * purchase form.
 *
 * It states twice over that the held amount is *already excluded* from the
 * figure above it. The frames repeat that sentence on every screen for a
 * reason: a balance that silently nets off a hold is the single easiest
 * number on a payments product to misread.
 */
export function WalletRail() {
  const { data, error } = useApi<Wallet>("/wallet");
  const held = data ? data.held_kobo + data.frozen_kobo : 0;
  return (
    <Panel title="Your wallet">
      <p className="text-[13px] text-muted">Available to spend</p>
      <p className="mt-1 text-[clamp(1.625rem,1.3rem+1.1vw,2rem)] leading-none font-semibold text-primary-text">
        {error ? "Unavailable" : data ? naira(data.available_kobo) : "…"}
      </p>
      {held > 0 ? (
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          {naira(held)} is held separately for payments in progress. The available balance already
          excludes this hold.
        </p>
      ) : null}
      <hr className="bs-rule my-4" />
      <RailLink href="/app/wallet/fund">Fund wallet</RailLink>
    </Panel>
  );
}
