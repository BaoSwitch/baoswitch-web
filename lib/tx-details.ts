/**
 * Per-transaction detail for the receipt / pending / failed / token screens.
 *
 * The frames draw these as four separate pages. They are one screen with
 * four states, keyed by reference — which is also how the product works, so
 * a link to a reference resolves no matter what state it is in by the time
 * someone opens it.
 */
import type { Step } from "@/components/app/ui";

export type TxDetail = {
  heading: string;
  blurb?: string;
  /** Headline figure and what to call it. */
  amountLabel: string;
  statusLabel?: string;
  rows: { label: string; value: string }[];
  timeline: { title: string; steps: Step[] };
  /** The one thing the reader must not get wrong on this state. */
  warning?: { tone: "info" | "warning" | "error"; title: string; body: string };
  /** Prepaid electricity only. */
  token?: { value: string; note: string };
};

export const TX_DETAILS: Record<string, TxDetail> = {
  "BSW-261018-0842": {
    heading: "Payment successful",
    blurb: "Your demo MTN data purchase has been confirmed.",
    amountLabel: "Total paid",
    rows: [
      { label: "Service", value: "Data Bundles · MTN" },
      { label: "Plan", value: "3 GB · 30 days" },
      { label: "Recipient", value: "Ada · 0803 ••• 4421" },
      { label: "Amount", value: "₦1,500.00" },
      { label: "Demo service fee", value: "₦0.00" },
      { label: "Payment method", value: "BAOSWITCH wallet" },
      { label: "Date & time", value: "18 Oct 2026 · 10:42 AM WAT" },
    ],
    timeline: {
      title: "Payment timeline",
      steps: [
        { label: "Payment authorised", detail: "18 Oct · 10:41 AM WAT", state: "done" },
        { label: "Provider confirmation received", detail: "18 Oct · 10:42 AM WAT", state: "done" },
        { label: "Receipt available", detail: "BSW-261018-0842 · Successful", state: "done" },
      ],
    },
  },

  "BSW-261018-0838": {
    heading: "Waiting for DStv confirmation",
    blurb: "Your payment is still awaiting the provider’s final response.",
    amountLabel: "Amount on hold",
    rows: [
      { label: "Service", value: "Cable TV · DStv" },
      { label: "Package", value: "Demo Family · One monthly cycle" },
      { label: "Customer / smartcard", value: "ADA O••••• · •••• 5812" },
      { label: "Demo service fee", value: "₦0.00" },
      { label: "Submitted", value: "18 Oct 2026 · 10:38 AM WAT" },
      { label: "Last checked", value: "18 Oct 2026 · 11:07 AM WAT" },
    ],
    timeline: {
      title: "Payment progress",
      steps: [
        { label: "Payment authorised", detail: "10:38 AM · Funds reserved in your wallet.", state: "done" },
        { label: "Provider response pending", detail: "Awaiting final subscription confirmation.", state: "current" },
        { label: "Final result", detail: "Status will update when confirmation is received.", state: "upcoming" },
      ],
    },
    warning: {
      tone: "warning",
      title: "Do not repeat this purchase",
      body: "₦5,000.00 is reserved for this transaction. We have not received a final provider result. Check status or report an issue instead of paying again.",
    },
  },

  "BSW-261016-0730": {
    heading: "Airtime purchase unsuccessful",
    amountLabel: "Attempted amount",
    statusLabel: "Failed · Not charged",
    rows: [
      { label: "Service", value: "Airtime · MTN" },
      { label: "Recipient", value: "0803 ••• 4421" },
      { label: "Date & time", value: "16 Oct 2026 · 11:30 AM WAT" },
      { label: "Failure reason · demo", value: "Provider rejected the top-up request" },
      { label: "Wallet debit", value: "₦0.00 · No debit posted" },
      { label: "Reversal", value: "Not required for this example" },
    ],
    timeline: {
      title: "What happened",
      steps: [
        { label: "Top-up requested", detail: "16 Oct · 11:30 AM WAT", state: "done" },
        { label: "Provider rejected request", detail: "Final failure received for this example.", state: "done" },
        { label: "No wallet debit posted", detail: "₦1,000.00 was not charged.", state: "done" },
      ],
    },
    warning: {
      tone: "error",
      title: "Different from a pending payment",
      body: "A final failure response was received, so no funds were charged for this attempt. Other payment failures may require a separate debit-status check.",
    },
  },

  "BSW-261017-0621": {
    // The page is titled "Electricity payment details"; the card heads with
    // the provider so the two do not say the same thing twice.
    heading: "Ikeja Electric · Prepaid",
    amountLabel: "Total paid",
    rows: [
      { label: "Service", value: "Ikeja Electric · Prepaid" },
      { label: "Customer", value: "ADA O•••••" },
      { label: "Meter number", value: "•••• •••• 2901" },
      { label: "Payment amount", value: "₦5,000.00" },
      { label: "Demo service fee", value: "₦0.00" },
      { label: "Date & time", value: "17 Oct 2026 · 09:21 AM WAT" },
      { label: "Payment method", value: "BAOSWITCH wallet" },
    ],
    timeline: {
      title: "Transaction timeline",
      steps: [
        { label: "Payment authorised", state: "done" },
        { label: "Provider confirmed success", state: "done" },
        { label: "Token issued", state: "done" },
      ],
    },
    token: {
      value: "0000 0000 0000 0000 0000",
      note: "Non-redeemable placeholder for demonstration only.",
    },
  },

  "BSW-261017-0915": {
    heading: "Payment successful",
    blurb: "Your demo Airtel airtime purchase has been confirmed.",
    amountLabel: "Total paid",
    rows: [
      { label: "Service", value: "Airtime · Airtel" },
      { label: "Recipient", value: "Ada · 0802 ••• 8810" },
      { label: "Amount", value: "₦2,000.00" },
      { label: "Demo service fee", value: "₦0.00" },
      { label: "Payment method", value: "BAOSWITCH wallet" },
      { label: "Date & time", value: "17 Oct 2026 · 04:15 PM WAT" },
    ],
    timeline: {
      title: "Payment timeline",
      steps: [
        { label: "Payment authorised", detail: "17 Oct · 04:15 PM WAT", state: "done" },
        { label: "Provider confirmation received", state: "done" },
        { label: "Receipt available", state: "done" },
      ],
    },
  },
};
