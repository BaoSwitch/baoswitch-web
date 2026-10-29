import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Panel, SplitBody, Notice, DetailRow } from "@/components/app/ui";
import { DemoChip } from "@/components/ui/status";
import { Button, ButtonLink } from "@/components/ui/button";
import { PasswordField } from "@/components/ui/field";
import { WALLET, money } from "@/lib/app-data";
import { DATA_BUNDLES } from "@/lib/pay-data";

export const metadata: Metadata = { title: "Review & authorise payment" };

const BUNDLE = DATA_BUNDLES[1];
const BEFORE = WALLET.available + BUNDLE.price;

export default function ReviewPage() {
  return (
    <>
      <PageHeader back="Edit data purchase" backHref="/app/pay/data" title="Review & authorise payment" />

      <SplitBody
        rail={
          <>
            <Panel title="Balance preview">
              <dl>
                <DetailRow label="Available before payment" value={money(BEFORE)} />
                <DetailRow label="Total payment" value={`− ${money(BUNDLE.price)}`} />
                <div className="mt-2 border-t border-line pt-2">
                  <DetailRow label="Available after success" value={money(WALLET.available)} strong />
                </div>
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                The separate {money(WALLET.held)} {WALLET.heldFor} hold is already excluded and is
                not deducted again.
              </p>
            </Panel>

            <Notice title="One payment, one clear record">
              Wait for the result after authorising. If provider confirmation is pending, check
              its status rather than repeating the purchase.
            </Notice>
          </>
        }
      >
        <Panel title="MTN data purchase" aside={<DemoChip>Review before payment</DemoChip>}>
          <dl>
            <DetailRow label="Recipient" value="Ada · My MTN line" />
            <DetailRow label="Phone number" value="0803 ••• 4421" />
            <DetailRow label="Network" value="MTN" />
            <DetailRow label="Plan" value={`${BUNDLE.size} · Monthly · 30 days`} />
          </dl>
          <hr className="bs-rule my-4" />
          <dl>
            <DetailRow label="Data amount" value={money(BUNDLE.price)} />
            <DetailRow label="Illustrative service fee" value={money(0)} />
            <div className="mt-2 border-t border-line pt-2">
              <DetailRow label="Total to pay" value={money(BUNDLE.price)} strong />
            </div>
          </dl>
          <Link
            href="/app/pay/data"
            className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
          >
            Edit recipient or plan
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </Panel>

        <Panel title="Authorise from your wallet">
          <form className="flex flex-col gap-4" action="/app/transactions/BSW-261018-0842" method="get">
            <PasswordField
              label="Four-digit transaction PIN"
              name="pin"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              autoComplete="off"
              required
              className="max-w-[18rem]"
              hint="Your PIN authorises this payment only. Do not enter your sign-in password."
            />
            <Link
              href="/app/settings/security"
              className="text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
            >
              Forgot transaction PIN?
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg">
                Pay {money(BUNDLE.price)}
              </Button>
              <ButtonLink href="/app/pay/data" variant="ghost" size="lg" className="border-line2">
                Cancel purchase
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
