import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

/**
 * The split layout both auth frames share: a green brand panel carrying a
 * tinted photograph, and a white panel holding the form.
 *
 * The frames place the two panels absolutely at 41.67%+81px. Here it is a
 * grid that collapses to one column below `lg`, where a 922px form panel
 * cannot sit beside anything. On a phone the brand panel would push the form
 * below the fold, so it is dropped entirely and only the logo is kept — the
 * photograph is decoration, and the form is the reason the page exists.
 */
export function AuthShell({
  photo,
  photoAlt,
  /** 0–1. The frames use 0.4 on sign-in and 0.3 on sign-up. */
  photoOpacity = 0.35,
  brand,
  children,
  backHref = "/",
}: {
  photo: string;
  photoAlt?: string;
  photoOpacity?: number;
  /** The brand-panel content under the logo. */
  brand: ReactNode;
  children: ReactNode;
  backHref?: string;
}) {
  return (
    <div className="grid min-h-dvh bg-primary lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* Brand panel */}
      <section className="relative isolate hidden overflow-hidden px-10 py-10 lg:flex lg:flex-col lg:justify-between xl:px-16">
        <Image
          src={photo}
          alt={photoAlt ?? ""}
          aria-hidden={photoAlt ? undefined : true}
          fill
          priority
          sizes="50vw"
          style={{ opacity: photoOpacity }}
          className="-z-10 object-cover"
        />
        {/* The photo is a mid-tone behind white text, so it gets a green
            scrim rather than being trusted to stay dark enough on its own. */}
        <span
          aria-hidden
          className="-z-10 absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/55 to-primary/85"
        />
        <Logo tone="light" className="text-[34px] xl:text-[41px]" />
        <div className="max-w-[34rem] text-white">{brand}</div>
      </section>

      {/* Form panel */}
      <section className="relative isolate flex flex-col bg-surface px-5 py-8 sm:px-10 lg:px-14 xl:px-20">
        <Link
          href={backHref}
          aria-label="Back"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface2"
        >
          <ArrowLeft className="size-6" />
        </Link>
        <div className="flex flex-1 flex-col justify-center py-8">
          <div className="mx-auto w-full max-w-[38rem]">
            <div className="mb-8 lg:hidden">
              <Logo className="text-[26px]" />
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

/** A tick-prefixed line in the brand panel's list. */
export function BrandCheck({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span aria-hidden className="mt-1 text-secondary">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
