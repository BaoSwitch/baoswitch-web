import type { Metadata } from "next";
import { PageHeader } from "@/components/app/ui";
import { FundWallet } from "@/components/app/fund-wallet";

export const metadata: Metadata = { title: "Fund your wallet" };

export default function FundWalletPage() {
  return (
    <>
      <PageHeader back="My wallet" backHref="/app/wallet" title="Fund your wallet" />
      <FundWallet />
    </>
  );
}
