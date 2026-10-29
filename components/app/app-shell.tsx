"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Grid3x3,
  Headset,
  LayoutGrid,
  LogOut,
  Menu,
  Receipt,
  Settings,
  Wallet,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { USER } from "@/lib/app-data";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Overview", href: "/app", icon: LayoutGrid },
  { label: "My wallet", href: "/app/wallet", icon: Wallet },
  { label: "Pay bills", href: "/app/pay", icon: Receipt },
  { label: "Transactions", href: "/app/transactions", icon: Grid3x3 },
  { label: "Beneficiaries", href: "/app/beneficiaries", icon: Bookmark },
  { label: "More services", href: "/app/services", icon: Grid3x3 },
];

/**
 * The customer dashboard chrome: a green rail and a thin topbar.
 *
 * The Overview frame styles unselected rail items as white pills and the
 * selected one as a dark green pill; the other thirty screens use plain text
 * with a single selected pill. The majority treatment wins here — one rail,
 * not two — and selection is carried by weight and `aria-current` as well as
 * colour, since a green-on-green pill is only 1.85:1 against the rail.
 */
const CRUMBS: [prefix: string, label: string][] = [
  ["/app/wallet/fund", "Fund wallet"],
  ["/app/wallet/status", "Funding status"],
  ["/app/wallet", "My wallet"],
  ["/app/pay", "Pay bills"],
  ["/app/transactions", "Transactions"],
  ["/app/beneficiaries", "Beneficiaries"],
  ["/app/services", "More services"],
  ["/app/support", "Support"],
  ["/app/settings", "Account settings"],
  ["/app/notifications", "Notifications"],
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Longest prefix wins, so /app/wallet/fund does not resolve to "My wallet".
  const breadcrumb = CRUMBS.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? "Overview";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-dvh bg-surface">
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[16rem] flex-col bg-primary text-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-7">
          <Logo tone="light" className="text-[25px]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="px-5 pb-3 text-[13px] font-semibold tracking-wide text-white">
          YOUR DASHBOARD
        </p>

        <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-3 text-[15px] transition-colors",
                      active
                        ? "bg-primary-dark font-semibold text-white"
                        : "text-white/90 hover:bg-white/15 hover:text-white",
                    )}
                  >
                    <item.icon className="size-[18px] shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pb-4">
          <div className="mb-4 rounded-[var(--radius-card)] bg-surface p-4">
            <Headset aria-hidden className="size-5 text-primary-text" />
            <p className="mt-2 font-semibold text-primary-text">Here to help.</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              Need help with a payment? Let&rsquo;s sort it out.
            </p>
            <Link
              href="/app/support"
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 hover:underline"
            >
              Contact support
              <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
          </div>

          <Link
            href="/app/settings"
            className="flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-2.5 text-[15px] text-white/90 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Settings className="size-[18px]" strokeWidth={1.8} />
            Account settings
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-2.5 text-[15px] text-white/90 transition-colors hover:bg-white/15 hover:text-white"
          >
            <LogOut className="size-[18px]" strokeWidth={1.8} />
            Sign out
          </Link>
          <hr className="mx-4 my-3 border-0 border-t border-white/25" />
          <p className="px-4 text-[11px] text-white/80">© 2026 BAOSWITCH Technologies</p>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[var(--bs-scrim)] lg:hidden"
        />
      ) : null}

      <div className="lg:pl-[16rem]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur-md sm:px-7">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-surface2 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2 text-sm">
              <li className="hidden sm:block">
                <Link href="/app" className="text-muted hover:text-ink">
                  My Dashboard
                </Link>
              </li>
              <li aria-hidden className="hidden text-muted sm:block">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="truncate font-medium text-ink">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <Link
              href="/app/notifications"
              aria-label="Notifications, 2 unread"
              className="relative inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-ink"
            >
              <Bell className="size-5" />
              <span
                aria-hidden
                className="absolute top-2 right-2.5 size-2 rounded-full bg-error ring-2 ring-[var(--bs-surface)]"
              />
            </Link>
            <Link
              href="/app/settings"
              className="flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 transition-colors hover:bg-surface2"
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[13px] font-semibold text-primary-text"
              >
                {USER.initials}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-semibold text-ink">{USER.name}</span>
                <span className="block text-xs text-muted">{USER.accountType}</span>
              </span>
              <ChevronDown aria-hidden className="size-4 text-muted" />
            </Link>
          </div>
        </header>

        <main id="main" className="px-4 py-6 sm:px-7 sm:py-8">
          {children}
        </main>

        <p className="px-4 pb-8 text-[12px] text-muted sm:px-7">
          Illustrative demo only · No live funds, providers, inventory or bookings.{" "}
          <Link href="/app/support" className="underline underline-offset-4 hover:text-ink">
            Help centre
          </Link>
        </p>
      </div>
    </div>
  );
}
