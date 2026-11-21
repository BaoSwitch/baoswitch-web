import type { Metadata } from "next";
import { PageHeader } from "@/components/app/ui";
import { FundingActivity } from "@/components/app/funding-activity";

export const metadata: Metadata = { title: "Funding activity" };

export default function FundingStatusPage() {
  return (
    <>
      <PageHeader back="My wallet" backHref="/app/wallet" title="Funding activity" />
      <FundingActivity />
    </>
  );
}
