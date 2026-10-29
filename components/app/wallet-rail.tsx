import { Panel, RailLink } from "@/components/app/ui";
import { WALLET, money } from "@/lib/app-data";

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
  return (
    <Panel title="Your wallet">
      <p className="text-[13px] text-muted">Available to spend</p>
      <p className="mt-1 text-[clamp(1.625rem,1.3rem+1.1vw,2rem)] leading-none font-semibold text-primary-text">
        {money(WALLET.available)}
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">
        {money(WALLET.held)} is held separately for one pending {WALLET.heldFor} payment. The
        available balance already excludes this hold.
      </p>
      <hr className="bs-rule my-4" />
      <RailLink href="/app/wallet/fund">Fund wallet</RailLink>
    </Panel>
  );
}
