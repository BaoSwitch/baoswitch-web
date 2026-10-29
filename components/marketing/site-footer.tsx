import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { DesignIcon } from "@/components/ui/design-icon";
import { CONTACT, SITE_LEGAL_NAME, SOCIAL } from "@/lib/site";
import { CONTACT_ART, FOOTER_LINKS, SOCIAL_ART } from "@/lib/content";

const SOCIAL_ICONS = [
  { href: SOCIAL.facebook, art: SOCIAL_ART.facebook, label: "BAOSWITCH on Facebook" },
  { href: SOCIAL.instagram, art: SOCIAL_ART.instagram, label: "BAOSWITCH on Instagram" },
  { href: SOCIAL.youtube, art: SOCIAL_ART.youtube, label: "BAOSWITCH on YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="bs-wrap flex flex-col gap-14 py-16 lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Logo tone="light" className="text-[30px] lg:text-[38px]" />

          {/* The design draws the field and its button as one pill. The
              button is nested inside the bordered field so they stay joined
              at any width, and the field collapses to a stacked pair on a
              phone where a 166px button leaves no room to type. */}
          <form
            className="flex w-full max-w-[33rem] flex-col gap-4"
            action="/api/subscribe"
            method="post"
          >
            <label htmlFor="footer-email" className="text-base">
              Get in touch
            </label>
            <div className="flex flex-col gap-3 sm:relative sm:block">
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your mail"
                className="h-14 w-full rounded-full border border-white/70 bg-transparent px-7 text-base text-white placeholder:text-white/60 focus-visible:outline-offset-4 sm:h-20 sm:pr-[12rem]"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full sm:absolute sm:top-1/2 sm:right-2 sm:w-[10.5rem] sm:-translate-y-1/2 sm:h-16"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,21rem)_1fr_auto] lg:gap-16">
          <section className="flex flex-col gap-4">
            <h2 className="text-base">Contact information</h2>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 hover:underline">
                  <DesignIcon art={CONTACT_ART.phone} className="size-5" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`https://wa.me/234${CONTACT.whatsapp.slice(1)}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <DesignIcon art={CONTACT_ART.whatsapp} alt="WhatsApp" className="size-5" />
                  {CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 break-all hover:underline">
                  <DesignIcon art={CONTACT_ART.email} className="size-5 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </section>

          <div className="grid gap-10 sm:grid-cols-3 lg:gap-12">
            {FOOTER_LINKS.map((group) => (
              <nav key={group.heading} aria-label={group.heading} className="flex flex-col gap-3">
                <h2 className="text-base font-semibold">{group.heading}</h2>
                <ul className="flex flex-col gap-2 text-[15px] text-white/85">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:text-white hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <section className="flex flex-col gap-3 lg:items-end">
            <h2 className="text-base">Follow us</h2>
            <ul className="flex items-center gap-3">
              {SOCIAL_ICONS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                  >
                    <DesignIcon art={social.art} className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/25 pt-6 text-[15px] text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_LEGAL_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-8">
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
