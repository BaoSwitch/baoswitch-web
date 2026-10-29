"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * The header is one floating pill in the design — logo, a white pill holding
 * the links, then Login/Register. It keeps that shape from `lg` up; below that
 * the pill cannot hold five 20px links, so the links move into a sheet behind
 * a menu button and the bar keeps only the logo and the two calls to action.
 *
 * It is sticky rather than static: at 6242px the Figma page is long enough
 * that losing the navigation after the fold is a real cost.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock the page behind the sheet while it is open, and let Escape close it.
  // The sheet closes on navigation from the links' own onClick rather than an
  // effect on `pathname` — setting state in an effect would cost a second
  // render pass on every route change, open or not.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-5">
      <div className="bs-wrap flex items-center gap-4">
        <Logo priority className="text-[22px] sm:text-[26px] lg:text-[29px]" />

        <nav
          aria-label="Primary"
          className="bs-glass mx-auto hidden rounded-full px-2 lg:flex"
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-3 text-[15px] transition-colors duration-200",
                  active
                    ? "font-semibold text-primary-text"
                    : "font-medium text-ink/75 hover:text-primary-text",
                )}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-primary-vivid"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <ButtonLink href="/login" variant="outline" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/signup" variant="primary">
            Register
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="bs-glass inline-flex size-11 items-center justify-center rounded-full text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet. Rendered only when open so the links are not in the
          tab order behind the page. */}
      {open ? (
        <div className="fixed inset-0 top-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[var(--bs-scrim)] backdrop-blur-[2px]"
          />
          <div
            id="mobile-nav"
            className="bs-card bs-edge absolute inset-x-4 top-24 rounded-[var(--radius-card)] p-3"
          >
            <nav aria-label="Primary" className="bs-raise flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[var(--radius-chip)] px-4 py-3.5 text-base font-medium text-ink hover:bg-primary-soft hover:text-primary-text"
                >
                  {link.label}
                </Link>
              ))}
              <span aria-hidden className="bs-rule my-2" />
              <ButtonLink
                href="/login"
                variant="outline"
                size="lg"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Login
              </ButtonLink>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
