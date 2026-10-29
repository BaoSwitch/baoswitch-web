import type { Metadata } from "next";
import { SplitPage, Eyebrow } from "@/components/marketing/split-page";
import { Button } from "@/components/ui/button";
import { DesignIcon } from "@/components/ui/design-icon";
import { Field } from "@/components/ui/field";
import { CONTACT_ART_GREEN } from "@/lib/content";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Reach BAOSWITCH by phone, WhatsApp or email.",
};

export default function ContactPage() {
  return (
    <SplitPage photo="/assets/photos/contact.png" side="end" wash={0.6}>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <Eyebrow>Contact us</Eyebrow>
          <h1 className="bs-h2 text-primary-text">Contact information</h1>
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center gap-3 text-primary-text underline-offset-4 hover:underline"
              >
                <DesignIcon art={CONTACT_ART_GREEN.phone} className="size-8" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/234${CONTACT.whatsapp.slice(1)}`}
                className="inline-flex items-center gap-3 text-primary-text underline-offset-4 hover:underline"
              >
                <DesignIcon art={CONTACT_ART_GREEN.whatsapp} alt="WhatsApp" className="size-8" />
                {CONTACT.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-3 break-all text-primary-text underline-offset-4 hover:underline"
              >
                <DesignIcon art={CONTACT_ART_GREEN.email} className="size-8 shrink-0" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </section>

        {/* The frame lists contact details and stops there, leaving no way to
            actually get in touch from the page. The form is the same shape as
            the footer's subscribe field and posts to the same kind of route. */}
        <form
          className="bs-card bs-edge flex flex-col gap-5 rounded-[var(--radius-card)] p-6 sm:p-8"
          action="/api/contact"
          method="post"
        >
          <h2 className="bs-raise text-xl font-semibold text-primary-text">Send us a message</h2>
          <div className="bs-raise grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" autoComplete="name" required placeholder="Ada Okafor" />
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="bs-raise flex flex-col gap-2.5">
            <label htmlFor="contact-message" className="text-[15px] font-medium text-primary-text">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              placeholder="How can we help?"
              className="w-full rounded-[var(--radius-field)] border border-primary/60 bg-surface px-5 py-4 text-[15px] text-ink transition-colors placeholder:text-muted/60 hover:border-primary focus-visible:border-primary"
            />
          </div>
          <div className="bs-raise">
            <Button type="submit" size="lg">
              Send message
            </Button>
          </div>
        </form>
      </div>
    </SplitPage>
  );
}
