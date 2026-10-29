/**
 * The three price tables from the Pricing frame, verbatim.
 *
 * The frame draws them as loose text in a CSS grid with no header semantics,
 * so they are kept here as data and rendered as real `<table>`s: a screen
 * reader can then announce "Airtime amount, 1,000" instead of reading three
 * disconnected columns top to bottom.
 */

export type AirtimeRow = {
  network: string;
  amount: number;
  pays: number;
  charge: number;
};

export const AIRTIME_PRICES: AirtimeRow[] = [
  { network: "MTN", amount: 100, pays: 100, charge: 0 },
  { network: "MTN", amount: 200, pays: 200, charge: 0 },
  { network: "MTN", amount: 500, pays: 500, charge: 0 },
  { network: "MTN", amount: 1000, pays: 1000, charge: 0 },
  { network: "MTN", amount: 2000, pays: 2000, charge: 0 },
  { network: "Airtel", amount: 100, pays: 100, charge: 0 },
  { network: "Airtel", amount: 200, pays: 200, charge: 0 },
  { network: "Airtel", amount: 500, pays: 500, charge: 0 },
  { network: "Airtel", amount: 1000, pays: 1000, charge: 0 },
  { network: "Glo", amount: 100, pays: 100, charge: 0 },
  { network: "Glo", amount: 500, pays: 500, charge: 0 },
  { network: "Glo", amount: 1000, pays: 1000, charge: 0 },
  { network: "9mobile", amount: 100, pays: 100, charge: 0 },
  { network: "9mobile", amount: 500, pays: 500, charge: 0 },
  { network: "9mobile", amount: 1000, pays: 1000, charge: 0 },
];

export type CableRow = { provider: string; plan: string; price: number };

export const CABLE_PRICES: CableRow[] = [
  { provider: "DStv", plan: "Compact", price: 19000 },
  { provider: "DStv", plan: "Compact Plus", price: 30000 },
  { provider: "DStv", plan: "Premium", price: 45000 },
  { provider: "GOtv", plan: "Smallie", price: 1900 },
  { provider: "GOtv", plan: "Jinja", price: 3900 },
  { provider: "GOtv", plan: "Jolli", price: 5800 },
  { provider: "GOtv", plan: "Max", price: 8500 },
  { provider: "GOtv", plan: "Supa", price: 11400 },
  { provider: "StarTimes", plan: "Nova", price: 1700 },
  { provider: "StarTimes", plan: "Basic", price: 3000 },
  { provider: "StarTimes", plan: "Smart", price: 4000 },
  { provider: "StarTimes", plan: "Classic", price: 6000 },
  { provider: "StarTimes", plan: "Super", price: 8000 },
];

export type ArchitectureRow = { category: string; description: string; from: number };

export const ARCHITECTURE_PRICES: ArchitectureRow[] = [
  { category: "2D floor plan", description: "Basic residential floor-plan layout", from: 50000 },
  { category: "3D exterior design", description: "Three-dimensional exterior visualization", from: 80000 },
  { category: "3D interior design", description: "Interior visualization for a room or defined space", from: 60000 },
  { category: "One-bedroom apartment design", description: "Conceptual design package", from: 150000 },
  { category: "Two-bedroom apartment design", description: "Conceptual design package", from: 250000 },
  { category: "Three-bedroom bungalow", description: "Residential design package", from: 350000 },
  { category: "Duplex design", description: "Multi-level residential concept design", from: 600000 },
  { category: "Commercial building design", description: "Office, retail, or other commercial concept", from: 800000 },
  { category: "Site plan design", description: "Site layout and development planning", from: 100000 },
  { category: "Renovation design", description: "Design for modifying an existing property", from: 120000 },
  { category: "Architectural consultation", description: "Initial consultation with a professional", from: 25000 },
];

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** Formats a figure as naira. Zero reads as "Free" — a charge of ₦0 is the
 *  selling point on the airtime table, so it should not look like a gap. */
export function formatNaira(value: number, zero = "Free"): string {
  return value === 0 ? zero : naira.format(value);
}
