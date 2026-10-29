import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Copy, HardHat, LifeBuoy, Shirt } from "lucide-react";
import { WalletCard } from "@/components/app/wallet-card";
import { RecentTransactions } from "@/components/app/recent-transactions";
import { ServiceIcon } from "@/components/app/ui";
import { PAY_SERVICES, USER } from "@/lib/app-data";

/** BAOSWITCH • User dashboard — the Overview screen. */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-semibold text-primary-text">
            Good morning, {USER.firstName} <span aria-hidden>👋</span>
          </h1>
          <p className="mt-1 text-[15px] text-muted">What are you paying for today?</p>
        </div>
        {USER.verified ? (
          <p className="inline-flex items-center gap-2 text-[13px] text-muted">
            <BadgeCheck aria-hidden className="size-4 text-success" />
            <span className="font-medium text-ink">Verified account</span>
            <span>{USER.verifiedOn}</span>
          </p>
        ) : null}
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <WalletCard />

        <section className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
          <h2 className="bs-raise text-[13px] font-medium text-muted">Your referral code</h2>
          <p className="bs-raise mt-1 flex items-center gap-2">
            <span className="num text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] font-semibold text-primary-text">
              {USER.referralCode}
            </span>
            <Copy aria-hidden className="size-4 text-muted" />
          </p>
          <ul className="bs-raise mt-4 flex flex-col gap-2 text-[13px] text-muted">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Share your code to earn
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Invite friends to BAOSWITCH
            </li>
          </ul>
        </section>
      </div>

      <section>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-primary-text">What&rsquo;s on your list?</h2>
          <p className="text-[13px] text-muted">Everyday essentials, one tap away.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {PAY_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/app/pay/${service.slug}`}
                className="bs-card bs-edge bs-lift group flex h-full flex-col gap-2 rounded-[var(--radius-card)] p-5"
              >
                <span className="bs-raise flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-[var(--radius-chip)] bg-primary-soft text-primary-text">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-muted transition-colors group-hover:text-primary-text"
                  />
                </span>
                <span className="bs-raise mt-1 font-semibold text-ink">{service.title}</span>
                <span className="bs-raise text-[13px] text-muted">{service.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RecentTransactions />

      <ul className="grid gap-5 lg:grid-cols-3">
        <li>
          <Link
            href="/app/services/laundry"
            className="bs-card bs-edge bs-lift group flex h-full flex-col gap-2 rounded-[var(--radius-card)] p-6"
          >
            <span className="bs-raise flex items-start justify-between">
              <Shirt aria-hidden className="size-6 text-primary-text" strokeWidth={1.7} />
              <ArrowUpRight aria-hidden className="size-4 text-muted group-hover:text-primary-text" />
            </span>
            <span className="bs-raise mt-1 font-semibold text-ink">Premium Laundry</span>
            <span className="bs-raise text-[13px] leading-relaxed text-muted">
              Fresh clothes, less hassle. Discover premium garment care with BAO 360.
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/app/services/architects"
            className="bs-card bs-edge bs-lift group flex h-full flex-col gap-2 rounded-[var(--radius-card)] p-6"
          >
            <span className="bs-raise flex items-start justify-between">
              <HardHat aria-hidden className="size-6 text-primary-text" strokeWidth={1.7} />
              <ArrowUpRight aria-hidden className="size-4 text-muted group-hover:text-primary-text" />
            </span>
            <span className="bs-raise mt-1 font-semibold text-ink">Hire an Architect</span>
            <span className="bs-raise text-[13px] leading-relaxed text-muted">
              Bring your next space to life with architectural design and real estate services.
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/app/support"
            className="bs-lift group flex h-full flex-col gap-2 rounded-[var(--radius-card)] border border-primary/20 bg-primary-soft p-6"
          >
            <span className="flex items-start justify-between">
              <LifeBuoy aria-hidden className="size-6 text-primary-text" strokeWidth={1.7} />
              <ArrowUpRight aria-hidden className="size-4 text-primary-text" />
            </span>
            <span className="mt-1 font-semibold text-primary-text">We&rsquo;ve got your back.</span>
            <span className="text-[13px] leading-relaxed text-primary-text/90">
              Payment taking longer than expected? Track its status or raise a dispute.
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
