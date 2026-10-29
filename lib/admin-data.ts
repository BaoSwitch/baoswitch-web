/**
 * Demo data for the admin overview.
 *
 * Every figure here is illustrative, not live — the dashboard frame is a
 * mock-up, so the numbers are internally consistent (the daily series sums to
 * the headline volume, the service shares total 100%, the attempt counts sum
 * to 12,480) rather than real. Swapping this module for an API call is the
 * only change the screen needs.
 */

export const PERIOD = { label: "12–18 Oct 2026", compare: "5–11 Oct 2026" } as const;

export type Kpi = {
  label: string;
  value: string;
  sub: string;
  delta: { value: string; direction: "up" | "down"; good: boolean };
  icon: "swap" | "chart" | "users" | "check";
};

export const KPIS: Kpi[] = [
  {
    label: "Transaction volume",
    value: "₦48.62m",
    sub: "12,480 payment attempts",
    delta: { value: "+12.4%", direction: "up", good: true },
    icon: "swap",
  },
  {
    label: "Revenue / fees",
    value: "₦486,200",
    sub: "Recognised platform fees",
    delta: { value: "+8.2%", direction: "up", good: true },
    icon: "chart",
  },
  {
    label: "Registered users",
    value: "8,420",
    sub: "126 new users this week",
    delta: { value: "+1.5%", direction: "up", good: true },
    icon: "users",
  },
  {
    label: "Payment success rate",
    value: "96.8%",
    sub: "12,080 successful of 12,480",
    delta: { value: "+0.6 pp", direction: "up", good: true },
    icon: "check",
  },
];

export type TrendPoint = { day: string; volume: number; count: number };

/** Daily series. `volume` is NGN millions and sums to the ₦48.62m headline;
 *  `count` is payment attempts and sums to 12,480. */
export const TREND: TrendPoint[] = [
  { day: "12 Oct", volume: 5.8, count: 1520 },
  { day: "13 Oct", volume: 6.4, count: 1680 },
  { day: "14 Oct", volume: 6.1, count: 1590 },
  { day: "15 Oct", volume: 6.95, count: 1810 },
  { day: "16 Oct", volume: 6.52, count: 1700 },
  { day: "17 Oct", volume: 7.65, count: 1980 },
  { day: "18 Oct", volume: 9.2, count: 2200 },
];

/** Share of payment attempt value, by service. Sums to 100%. */
export const SERVICE_SHARE: { service: string; share: number }[] = [
  { service: "Data Bundles", share: 31 },
  { service: "Electricity", share: 25 },
  { service: "Airtime", share: 20 },
  { service: "Cable TV", share: 15 },
  { service: "Exam Pins", share: 6 },
  { service: "Bulk SMS", share: 3 },
];

export type TxStatus = "successful" | "pending" | "failed";

export type Transaction = {
  reference: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  status: TxStatus;
};

export const TRANSACTIONS: Transaction[] = [
  {
    reference: "BSW-261018-0842",
    customer: "Ada Okafor",
    service: "Data Bundles",
    date: "18 Oct 2026",
    time: "10:42 AM WAT",
    amount: 1500,
    status: "successful",
  },
  {
    reference: "BSW-261018-0841",
    customer: "Musa Bello",
    service: "Airtime",
    date: "18 Oct 2026",
    time: "10:41 AM WAT",
    amount: 2000,
    status: "successful",
  },
  {
    reference: "BSW-261018-0840",
    customer: "Chioma Eze",
    service: "Electricity",
    date: "18 Oct 2026",
    time: "10:40 AM WAT",
    amount: 5000,
    status: "failed",
  },
  {
    reference: "BSW-261018-0839",
    customer: "Tunde Akin",
    service: "Bulk SMS",
    date: "18 Oct 2026",
    time: "10:39 AM WAT",
    amount: 3000,
    status: "successful",
  },
  {
    reference: "BSW-261018-0838",
    customer: "Ada Okafor",
    service: "Cable TV",
    date: "18 Oct 2026",
    time: "10:38 AM WAT",
    amount: 5000,
    status: "pending",
  },
];

export const TOTAL_TRANSACTIONS = 12480;

export const ATTENTION = [
  {
    value: "240",
    label: "Pending transactions",
    sub: "42 waiting over 15 min",
    action: { label: "Open pending queue", href: "/admin/transactions?status=pending" },
    tone: "warning" as const,
    icon: "clock" as const,
  },
  {
    value: "160",
    label: "Failed transactions",
    sub: "Check reversals & retries",
    action: { label: "Review failed payments", href: "/admin/transactions?status=failed" },
    tone: "error" as const,
    icon: "x" as const,
  },
  {
    value: "18",
    label: "Open disputes",
    sub: "4 high priority cases",
    action: { label: "Go to support inbox", href: "/admin/support" },
    tone: "info" as const,
    icon: "message" as const,
  },
];

export type ProviderState = "operational" | "degraded" | "down";

export const PROVIDER_HEALTH: { name: string; state: ProviderState }[] = [
  { name: "Airtime & data", state: "operational" },
  { name: "Electricity", state: "degraded" },
  { name: "Cable TV", state: "operational" },
  { name: "Exam Pins & SMS", state: "operational" },
];

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

export function formatAmount(value: number) {
  return naira.format(value);
}
