import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * The design sets every weight in Poppins, from the Light tagline to the
 * ExtraBold wordmark.
 *
 * Self-hosted rather than pulled from Google Fonts at build time: the files
 * are served from our own origin, so there is no third-party request on first
 * paint, the build does not depend on fonts.gstatic.com being reachable, and
 * no visitor IP is handed to Google. `@fontsource/poppins` is the source of
 * the .woff2 files in `app/fonts`.
 */
const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "./fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — all your bills, one blink`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "From airtime and data to electricity and TV subscriptions, BAOSWITCH makes everyday payments simple, seamless and convenient. One wallet, every service.",
  applicationName: SITE_NAME,
  keywords: [
    "buy airtime Nigeria",
    "buy data Nigeria",
    "pay electricity bill",
    "DStv subscription",
    "GOtv subscription",
    "WAEC result checker pin",
    "bulk SMS Nigeria",
    "VTU Nigeria",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: SITE_URL,
    title: `${SITE_NAME} — all your bills, one blink`,
    description:
      "Airtime, data, electricity, cable TV, exam pins and bulk SMS from one wallet.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  authors: [{ name: SITE_LEGAL_NAME }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#061021" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `suppressHydrationWarning` covers the `js` class the inline script in
    // <head> adds before React hydrates: the server cannot know it is coming,
    // and without this React reports a mismatch on every load.
    <html lang="en-NG" suppressHydrationWarning className={`${poppins.variable} h-full`}>
      <head>
        {/* Marks that JS is running before first paint, so the scroll-reveal
            CSS only ever hides content it can also show again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
