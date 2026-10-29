import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, HardHat, Shirt, ArrowLeftRight } from "lucide-react";
import { PageHeader, Panel, SplitBody, ServiceIcon, RailLink } from "@/components/app/ui";
import { WalletRail } from "@/components/app/wallet-rail";
import { BENEFICIARIES, PAY_SERVICES } from "@/lib/app-data";

export const metadata: Metadata = { title: "Pay bills" };

export default function PayBillsPage() {
  // The rail shows a short list; the full set lives on the Beneficiaries screen.
  const saved = BENEFICIARIES.slice(0, 3);

  return (
    <>
      {/* The frame's back link on this screen points at "Pay bills" — the
          screen you are already on. It points up a level instead. */}
      <PageHeader back="Overview" backHref="/app" title="What’s on your list?" />

      <SplitBody
        rail={
          <>
            <WalletRail />

            <Panel title="Saved beneficiaries">
              <ul className="flex flex-col">
                {saved.map((b) => (
                  <li key={b.id} className="border-b border-line last:border-0">
                    <Link
                      href={`/app/beneficiaries/${b.id}`}
                      className="flex items-center gap-3 py-3 transition-colors hover:text-primary-text"
                    >
                      <span
                        aria-hidden
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-semibold text-primary-text"
                      >
                        {b.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-ink">
                          {b.name}
                        </span>
                        <span className="block truncate text-[12px] text-muted">{b.provider}</span>
                      </span>
                      <ChevronRight aria-hidden className="size-4 shrink-0 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/beneficiaries">Manage beneficiaries</RailLink>
            </Panel>

            <Link
              href="/app/transactions"
              className="bs-card bs-edge bs-lift flex items-center justify-center gap-2 rounded-[var(--radius-card)] px-5 py-4 text-[14px] font-semibold text-primary-text"
            >
              <ArrowLeftRight aria-hidden className="size-4" />
              View transaction history
            </Link>
          </>
        }
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAY_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/app/pay/${service.slug}`}
                className="bs-card bs-edge bs-lift group flex h-full flex-col gap-3 rounded-[var(--radius-card)] p-6"
              >
                <span className="bs-raise flex size-11 items-center justify-center rounded-[var(--radius-chip)] bg-primary-soft text-primary-text">
                  <ServiceIcon name={service.icon} className="size-[22px]" />
                </span>
                <span className="bs-raise text-lg font-semibold text-primary-text">
                  {service.title}
                </span>
                <span className="bs-raise mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text">
                  {service.cta}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Panel title="More from BAOSWITCH">
          <ul className="grid gap-5 sm:grid-cols-2">
            <li>
              <Link
                href="/app/services/laundry"
                className="group flex h-full flex-col gap-2 rounded-[var(--radius-field)] border border-line p-5 transition-colors hover:border-line2"
              >
                <Shirt aria-hidden className="size-6 text-primary-text" strokeWidth={1.7} />
                <span className="font-semibold text-primary-text">Premium Laundry · BAO 360</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] font-semibold text-primary-text">
                  Book laundry
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/app/services/architects"
                className="group flex h-full flex-col gap-2 rounded-[var(--radius-field)] border border-line p-5 transition-colors hover:border-line2"
              >
                <HardHat aria-hidden className="size-6 text-primary-text" strokeWidth={1.7} />
                <span className="font-semibold text-primary-text">Hire an Architect</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] font-semibold text-primary-text">
                  Find an expert
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          </ul>
        </Panel>
      </SplitBody>
    </>
  );
}
