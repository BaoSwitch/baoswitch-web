"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Banknote,
  Bell,
  ChevronDown,
  ChevronRight,
  Headset,
  LayoutGrid,
  LogOut,
  Menu,
  Radio,
  Settings,
  ShoppingBag,
  Users,
  FileBarChart,
  ArrowLeftRight,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutGrid },
  { label: "Transactions", href: "/admin/transactions", icon: ArrowLeftRight },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Services & pricing", href: "/admin/services", icon: ShoppingBag },
  { label: "Wallets & settlements", href: "/admin/wallets", icon: Banknote },
  { label: "Support & disputes", href: "/admin/support", icon: Headset },
  { label: "Providers", href: "/admin/providers", icon: Radio },
  { label: "Reports", href: "/admin/reports", icon: FileBarChart },
];

/**
 * The admin chrome: a fixed navy rail and a topbar.
 *
 * The rail is `position: fixed` rather than a grid column so the main area
 * scrolls on its own and the navigation never leaves the viewport — at 1,681px
 * the frame's content is well past one screen. Below `lg` the rail becomes a
 * drawer behind a menu button, because a 240px rail plus a data table does not
 * fit on a tablet.
 */
export function AdminShell({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-dvh bg-bg2">
      {/* Rail */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col bg-accent text-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-8">
          <Logo tone="light" className="text-[26px]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="px-6 pb-3 text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
          Admin workspace
        </p>

        <nav aria-label="Admin" className="flex-1 overflow-y-auto px-4">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-3 text-[15px] transition-colors",
                      active
                        ? "bg-primary font-semibold text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
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

        <div className="flex flex-col gap-1 px-4 pb-4">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-3 text-[15px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Settings className="size-[18px]" strokeWidth={1.8} />
            Platform settings
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-[var(--radius-chip)] px-4 py-3 text-[15px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-[18px]" strokeWidth={1.8} />
            Sign out
          </Link>
          <p className="px-4 pt-3 text-[11px] text-white/55">© 2026 BAOSWITCH Technologies</p>
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

      {/* Main column */}
      <div className="lg:pl-[17.5rem]">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-line bg-surface/90 px-5 py-3.5 backdrop-blur-md sm:px-8">
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
              <li className="hidden text-muted sm:block">Admin Dashboard</li>
              <li aria-hidden className="hidden text-muted sm:block">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="truncate font-medium text-ink">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/admin/notifications"
              aria-label="Notifications, 3 unread"
              className="relative inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-ink"
            >
              <Bell className="size-5" />
              <span
                aria-hidden
                className="absolute top-2 right-2.5 size-2 rounded-full bg-error ring-2 ring-[var(--bs-surface)]"
              />
            </Link>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 transition-colors hover:bg-surface2"
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white"
              >
                OA
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-medium text-ink">Oluwaseun Ade</span>
                <span className="block text-xs text-muted">Super administrator</span>
              </span>
              <ChevronDown className="size-4 text-muted" />
            </button>
          </div>
        </header>

        <main id="main" className="px-5 py-7 sm:px-8 sm:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}
