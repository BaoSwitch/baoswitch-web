/**
 * Demo data for the customer dashboard.
 *
 * Everything is illustrative, and the figures are made internally consistent
 * across all thirty screens: the wallet maths balances, the five recent
 * transactions are the same five everywhere they appear, and a reference
 * quoted on one screen resolves on another.
 *
 * One normalisation: the frames label the same electricity payment
 * "Ikeja Electric" on the beneficiary, history and summary screens, and
 * "Abuja Electricity Company" on the pay-electricity form and the token
 * receipt. They are one payment, so one name — Ikeja Electric.
 */

export const USER = {
  name: "Ada Okafor",
  firstName: "Ada",
  lastName: "Okafor",
  initials: "AO",
  accountType: "Personal account",
  email: "ada.o•••@example.com",
  phone: "+234 803 ••• 4421",
  verified: true,
  verifiedOn: "18 Oct 2026",
  referralCode: "DYXM06BAO",
} as const;

export const WALLET = {
  available: 37500,
  held: 5000,
  heldFor: "DStv",
  total: 42500,
  pendingIncoming: 10000,
  bank: "Wema Bank",
  accountNumber: "0123456789",
  accountName: "BAOSWITCH / Ada Okafor",
} as const;

export type FundingStatus = "credited" | "awaiting";

export const FUNDING_HISTORY: {
  reference: string;
  date: string;
  time: string;
  amount: number;
  status: FundingStatus;
}[] = [
  { reference: "FND-261018-1105", date: "18 Oct", time: "11:05 AM WAT", amount: 10000, status: "awaiting" },
  { reference: "FND-261015-0840", date: "15 Oct", time: "08:40 AM WAT", amount: 25000, status: "credited" },
  { reference: "FND-261010-1420", date: "10 Oct", time: "02:20 PM WAT", amount: 20000, status: "credited" },
];

export type TxStatus = "successful" | "pending" | "failed";

export type Tx = {
  reference: string;
  service: string;
  provider: string;
  icon: "airtime" | "data" | "electricity" | "cable" | "exam" | "sms";
  date: string;
  time: string;
  amount: number;
  status: TxStatus;
};

export const TRANSACTIONS: Tx[] = [
  {
    reference: "BSW-261018-0842",
    service: "Data Bundles",
    provider: "MTN",
    icon: "data",
    date: "18 Oct 2026",
    time: "10:42 AM WAT",
    amount: 1500,
    status: "successful",
  },
  {
    reference: "BSW-261018-0838",
    service: "Cable TV",
    provider: "DStv",
    icon: "cable",
    date: "18 Oct 2026",
    time: "10:38 AM WAT",
    amount: 5000,
    status: "pending",
  },
  {
    reference: "BSW-261017-0915",
    service: "Airtime",
    provider: "Airtel",
    icon: "airtime",
    date: "17 Oct 2026",
    time: "04:15 PM WAT",
    amount: 2000,
    status: "successful",
  },
  {
    reference: "BSW-261017-0621",
    service: "Electricity",
    provider: "Ikeja Electric",
    icon: "electricity",
    date: "17 Oct 2026",
    time: "09:21 AM WAT",
    amount: 5000,
    status: "successful",
  },
  {
    reference: "BSW-261016-0730",
    service: "Airtime",
    provider: "MTN",
    icon: "airtime",
    date: "16 Oct 2026",
    time: "11:30 AM WAT",
    amount: 1000,
    status: "failed",
  },
];

/** October roll-ups shown on the transaction-history screen. */
export const SPEND_SUMMARY = {
  successfulCount: 18,
  successfulTotal: 32500,
  pendingCount: 1,
  pendingTotal: 5000,
  failedCount: 1,
  failedTotal: 1000,
  totalAttempts: 20,
} as const;

export type BeneficiaryKind = "airtime-data" | "electricity" | "cable" | "sms";

export const BENEFICIARIES: {
  id: string;
  name: string;
  /** Explicit, because deriving from the display name breaks on "Ada · Airtel"
   *  and the frames themselves derive these inconsistently. */
  initials: string;
  kind: BeneficiaryKind;
  service: string;
  provider: string;
  identifier: string;
}[] = [
  { id: "mtn-line", initials: "MM", name: "My MTN line", kind: "airtime-data", service: "Data & airtime", provider: "MTN", identifier: "0803 ••• 4421" },
  { id: "ada-airtel", initials: "AA", name: "Ada · Airtel", kind: "airtime-data", service: "Airtime", provider: "Airtel", identifier: "0802 ••• 8810" },
  { id: "home-electricity", initials: "HE", name: "Home electricity", kind: "electricity", service: "Electricity", provider: "Ikeja Electric · Prepaid", identifier: "•••• •••• 2901" },
  { id: "living-room-tv", initials: "LR", name: "Living room TV", kind: "cable", service: "Cable TV", provider: "DStv", identifier: "•••• ••5812" },
  { id: "office-electricity", initials: "OE", name: "Office electricity", kind: "electricity", service: "Electricity", provider: "Ikeja Electric · Postpaid", identifier: "•••• •••• 3317" },
  { id: "study-group", initials: "SG", name: "Study group", kind: "sms", service: "Bulk SMS", provider: "20 consented demo recipients", identifier: "20 recipients" },
];

/** The six payable services, in the order the Pay bills hub lists them. */
export const PAY_SERVICES = [
  { slug: "airtime", title: "Airtime", tagline: "Top up any network", cta: "Buy airtime", icon: "airtime" as const },
  { slug: "data", title: "Data Bundles", tagline: "Stay connected", cta: "Buy data", icon: "data" as const },
  { slug: "electricity", title: "Electricity", tagline: "Power your everyday", cta: "Pay electricity", icon: "electricity" as const },
  { slug: "cable", title: "Cable TV", tagline: "Keep watching", cta: "Manage subscription", icon: "cable" as const },
  { slug: "exam-pins", title: "Exam Pins", tagline: "WAEC, NECO & NABTEB", cta: "Buy exam PINs", icon: "exam" as const },
  { slug: "bulk-sms", title: "Bulk SMS", tagline: "Reach more people", cta: "Compose message", icon: "sms" as const },
];

export const SUPPORT_TICKET = {
  id: "BSW-SUP-1042",
  subject: "DStv payment still pending",
  category: "Pending payment",
  linkedTx: "BSW-261018-0838",
  service: "DStv",
  amount: 5000,
  createdAt: "18 Oct 2026 at 11:10 AM WAT",
  state: "Open · Awaiting provider response",
} as const;

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
});

export function money(value: number) {
  return naira.format(value);
}
