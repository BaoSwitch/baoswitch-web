/**
 * Every string and asset path the landing page renders, in one module.
 *
 * The sections are data-driven rather than hand-written markup so copy edits
 * never touch layout, and so the same lists can feed the dashboard and the
 * standalone marketing pages later.
 */

import type { IconArt } from "@/components/ui/design-icon";

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  /** Glyph exported from Figma. */
  icon?: IconArt;
  /**
   * Fallback glyph for a service the frame never drew an icon for. Laundry
   * was represented by the BAO 360 wordmark crammed into the tile, which is
   * a logo doing an icon's job — illegible at icon size and silent about
   * what the service is.
   */
  lucide?: "shirt";
  href: string;
  /**
   * `bills` is the core product — things you top up or settle.
   * `group` is the rest of BAO Group: a booking and a commission, not a
   * bill. The frame gives all eight the same green tile, which tells a
   * first-time visitor that hiring an architect and buying ₦100 of airtime
   * are the same kind of action. They are not, so they are split.
   */
  kind: "bills" | "group";
};

export const SERVICES: Service[] = [
  {
    slug: "data",
    kind: "bills",
    title: "Data Bundles",
    blurb: "Purchase data bundles for supported networks",
    icon: { src: "/assets/icons/svc-data.svg", w: 66.6263, h: 50.3588, slot: 80 },
    href: "/services/data",
  },
  {
    slug: "airtime",
    kind: "bills",
    title: "Airtime",
    blurb: "Recharge supported mobile networks",
    icon: { src: "/assets/icons/svc-airtime.svg", w: 80, h: 80, slot: 80 },
    href: "/services/airtime",
  },
  {
    slug: "cable",
    kind: "bills",
    title: "Cable TV",
    blurb: "Renew supported television subscriptions",
    icon: { src: "/assets/icons/svc-cable.svg", w: 80, h: 80, slot: 80 },
    href: "/services/cable",
  },
  {
    slug: "electricity",
    kind: "bills",
    title: "Electricity",
    blurb: "Pay electricity bills for supported providers",
    icon: { src: "/assets/icons/svc-electricity.svg", w: 46.6663, h: 66.6667, slot: 80 },
    href: "/services/electricity",
  },
  {
    slug: "exam-pins",
    kind: "bills",
    title: "Exam Pins",
    blurb: "WAEC, NECO & NABTEB checkers",
    icon: { src: "/assets/icons/svc-exam-pins.svg", w: 80, h: 80, slot: 80 },
    href: "/services/exam-pins",
  },
  {
    slug: "bulk-sms",
    kind: "bills",
    title: "Bulk SMS",
    blurb: "Reach customers instantly",
    icon: { src: "/assets/icons/svc-bulk-sms.svg", w: 68.6667, h: 63.5641, slot: 80 },
    href: "/services/bulk-sms",
  },
  {
    slug: "laundry",
    kind: "group",
    title: "BAO 360 Laundry",
    blurb: "Premium laundry service, offering fast, reliable, and hassle-free garment care",
    lucide: "shirt",
    href: "/services/laundry",
  },
  {
    slug: "architect",
    kind: "group",
    title: "Hire an Architect",
    blurb: "Get the best of architectural designs & real estate services",
    icon: { src: "/assets/icons/svc-architect.svg", w: 80, h: 80, slot: 80 },
    href: "/services/architect",
  },
];

/** The floating service chips that orbit the hero portrait. */
export const HERO_CHIPS: { label: string; icon: IconArt }[] = [
  { label: "Cable Subscriptions", icon: { src: "/assets/icons/chip-cable.svg", w: 26.3066, h: 26.3066, slot: 26.3066 } },
  { label: "Airtime", icon: { src: "/assets/icons/chip-airtime.svg", w: 26.3066, h: 26.3066, slot: 26.3066 } },
  { label: "Electricity Bills", icon: { src: "/assets/icons/chip-electricity.svg", w: 26.3066, h: 26.3066, slot: 26.3066 } },
  { label: "Data", icon: { src: "/assets/icons/chip-data.svg", w: 15.3455, h: 24.1144, slot: 26.3066 } },
  { label: "Bulk SMS", icon: { src: "/assets/icons/chip-bulk-sms.svg", w: 26, h: 24.2633, slot: 26 } },
  { label: "Exam Pins", icon: { src: "/assets/icons/chip-exam-pins.svg", w: 30, h: 30, slot: 30 } },
];

export const STEPS: {
  title: string;
  body: string;
  icon: IconArt;
  badge: string;
}[] = [
  {
    title: "Create account",
    body: "Sign up and provide the information required to establish your account.",
    icon: { src: "/assets/icons/step-create-account.svg", w: 66.5, h: 56.6667, slot: 80 },
    badge: "/assets/icons/step-badge-1.png",
  },
  {
    title: "Fund account",
    body: "Credit your wallet via dedicated virtual accounts with instant settlement.",
    icon: { src: "/assets/icons/step-fund-account.svg", w: 80, h: 80, slot: 80 },
    badge: "/assets/icons/step-badge-2.png",
  },
  {
    title: "Choose a service",
    body: "Airtime, data, electricity, cable TV, exam pins, SMS and more.",
    icon: { src: "/assets/icons/step-choose-service.svg", w: 80, h: 80, slot: 80 },
    badge: "/assets/icons/step-badge-3.png",
  },
];

/**
 * The frame lists six one-word virtues — "Convenience", "Visibility",
 * "Straightforward". They are interchangeable with any competitor's and say
 * nothing a visitor can check. Each is replaced with the specific thing the
 * product actually does, drawn from a screen that exists in the design file,
 * so the section argues rather than asserts.
 */
export const REASONS = [
  {
    title: "One wallet for everything",
    body: "Fund once through your dedicated virtual account, then pay airtime, data, electricity, TV, exam pins and bulk SMS from the same balance.",
  },
  {
    title: "Every payment has a receipt",
    body: "Reference, timestamp and electricity token on one page, kept in a transaction history you can search later.",
  },
  {
    title: "You always know where an order stands",
    body: "Successful, pending or failed — never a blank screen and a debited wallet.",
  },
  {
    title: "No surprise charges",
    body: "₦1,000 of airtime costs ₦1,000. Every service charge is published on the pricing page before you pay.",
  },
  {
    title: "Numbers you pay often, saved",
    body: "Keep the phone numbers and meter IDs you use most, so a repeat payment takes two taps instead of ten.",
  },
  {
    title: "Support that leaves a trail",
    body: "Phone, WhatsApp and email, plus a ticket for any transaction you need looked into.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Garba Sheu",
    role: "Abuja resident",
    avatar: "/assets/photos/testimonial-garba.png",
    rating: 4,
    quote:
      "Before BAOSWITCH, I sometimes had to try different platforms before getting my data. Now, I can purchase my data in just a few steps without unnecessary stress. It makes staying connected to school and friends much easier.",
  },
  {
    name: "Zahra Musa",
    role: "Student, Keffi",
    avatar: "/assets/photos/testimonial-zahra.png",
    rating: 5,
    quote:
      "As a student, I need a convenient way to buy airtime and data whenever I need them. BAOSWITCH gives me a simple way to handle my everyday digital payments, so I can focus more on my coursework.",
  },
  {
    name: "James Emma",
    role: "Trader, Awka",
    avatar: "/assets/photos/testimonial-james.png",
    rating: 4,
    quote:
      "I enjoy having my TV subscription and other essential payments accessible in one place. BAOSWITCH offers a convenient way to manage these everyday needs without unnecessary hassle.",
  },
] as const;

export type Provider = {
  name: string;
  src: string;
  w: number;
  h: number;
  /** Puts a navy plate behind a logo that is itself white-on-transparent. */
  tint?: boolean;
};

/** The supported-provider strip, in the order the frame lists them. */
export const PROVIDERS: Provider[] = [
  { name: "BAO 360 Laundry", src: "/assets/logos/bao360.png", w: 280, h: 98, tint: true },
  { name: "MTN", src: "/assets/logos/mtn.png", w: 126, h: 118 },
  { name: "Glo", src: "/assets/logos/glo.png", w: 156, h: 160 },
  { name: "9mobile", src: "/assets/logos/9mobile.png", w: 106, h: 129 },
  { name: "Airtel", src: "/assets/logos/airtel.png", w: 119, h: 119 },
  { name: "GOtv", src: "/assets/logos/gotv.png", w: 276, h: 115 },
  { name: "StarTimes", src: "/assets/logos/startimes.png", w: 292, h: 103 },
  { name: "IBEDC", src: "/assets/logos/ibedc.png", w: 146, h: 146 },
  { name: "EKEDC", src: "/assets/logos/ekedc.png", w: 177, h: 95 },
  { name: "AEDC", src: "/assets/logos/aedc.png", w: 168, h: 95 },
  { name: "WAEC", src: "/assets/logos/waec.png", w: 179, h: 107 },
  { name: "NECO", src: "/assets/logos/neco.png", w: 162, h: 108 },
];

export const FAQS = [
  {
    q: "What is BAOSWITCH?",
    a: "BAOSWITCH is a digital payment platform designed to make everyday payments easier and more convenient. You can use it to purchase airtime and data, pay electricity bills, renew TV subscriptions, and access other supported digital services — all in one place.",
  },
  {
    q: "What services can I pay for on BAOSWITCH?",
    a: "Airtime and data for every supported network, electricity bills, cable TV subscriptions, WAEC, NECO and NABTEB result checker pins, and bulk SMS. BAO 360 Laundry and architectural consultations are booked from the same wallet.",
  },
  {
    q: "How do I get started with BAOSWITCH?",
    a: "Create an account with your phone number and email, verify the contact we send a code to, then set a transaction PIN. Funding your wallet is the only step between signing up and your first purchase.",
  },
  {
    q: "How do I purchase airtime or data?",
    a: "Pick the service from your dashboard, choose the network and the bundle, enter the phone number — or pick a saved beneficiary — and authorise with your transaction PIN. Delivery is immediate and every order carries a receipt.",
  },
  {
    q: "How can I pay my electricity bill?",
    a: "Choose Electricity, select your distribution company, enter your meter number and the amount, and authorise the payment. Prepaid tokens appear on the receipt and are sent to you by SMS and email.",
  },
  {
    q: "Can I renew my TV subscription on BAOSWITCH?",
    a: "Yes. GOtv, DStv and StarTimes subscriptions can be renewed from the Cable TV service. Enter your smartcard or IUC number, pick the bouquet, and authorise.",
  },
  {
    q: "How do I fund my BAOSWITCH wallet?",
    a: "Every account gets a dedicated virtual account number. Transfer to it from any bank app and your wallet is credited automatically, usually within seconds.",
  },
] as const;

/** Icon art used outside the data lists above. */
export const STAR_ART: IconArt = {
  src: "/assets/icons/star-filled.svg",
  w: 22.1131,
  h: 21.1752,
  slot: 24,
};

export const CONTACT_ART = {
  phone: { src: "/assets/icons/phone-call.svg", w: 24.1683, h: 24.1683, slot: 24.1683 },
  whatsapp: { src: "/assets/icons/whatsapp.svg", w: 22.2922, h: 22.2922, slot: 22.2922 },
  email: { src: "/assets/icons/gmail.svg", w: 24.1683, h: 24.1683, slot: 24.1683 },
} satisfies Record<string, IconArt>;

/** Green-on-light variants of the same marks. The footer sits on black and
 *  uses the white exports above; on a white page those are invisible, so the
 *  Contact frame ships its own green set. */
export const CONTACT_ART_GREEN = {
  phone: { src: "/assets/icons/phone-call-green.svg", w: 44.3525, h: 44.3525, slot: 44.3525 },
  whatsapp: { src: "/assets/icons/whatsapp-green.svg", w: 40.9096, h: 40.9096, slot: 40.9096 },
  email: { src: "/assets/icons/gmail-green.svg", w: 44.3525, h: 44.3525, slot: 44.3525 },
} satisfies Record<string, IconArt>;

export const SOCIAL_ART = {
  facebook: { src: "/assets/icons/facebook.svg", w: 24, h: 24, slot: 24 },
  instagram: { src: "/assets/icons/instagram.svg", w: 24, h: 24, slot: 24 },
  youtube: { src: "/assets/icons/youtube.svg", w: 24.0032, h: 16.0096, slot: 24 },
} satisfies Record<string, IconArt>;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "Services", href: "#services" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQs", href: "#faqs" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Sign Up", href: "/signup" },
      { label: "Log In", href: "/login" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Report a Transaction Issue", href: "/help/report" },
    ],
  },
] as const;
