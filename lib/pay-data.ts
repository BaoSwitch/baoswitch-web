/**
 * Catalogue data for the six purchase forms. Illustrative, and the figures
 * agree with the payment summaries the frames show beside each form.
 */

export const NETWORKS = ["MTN", "Airtel", "Glo", "9mobile"] as const;
export type Network = (typeof NETWORKS)[number];

export const AIRTIME_PRESETS = [500, 1000, 2000, 5000] as const;

export type DataBundle = {
  id: string;
  size: string;
  period: string;
  validity: string;
  price: number;
};

export const DATA_PERIODS = ["Monthly", "Weekly", "Daily"] as const;

export const DATA_BUNDLES: DataBundle[] = [
  { id: "mtn-1gb", size: "1 GB", period: "Monthly plan", validity: "Valid for 30 days", price: 800 },
  { id: "mtn-3gb", size: "3 GB", period: "Monthly plan", validity: "Valid for 30 days", price: 1500 },
  { id: "mtn-5gb", size: "5 GB", period: "Monthly plan", validity: "Valid for 30 days", price: 2500 },
];

export const DISCOS = [
  "Ikeja Electric",
  "Abuja Electricity Company",
  "Eko Electricity Distribution",
  "Port Harcourt Electricity",
  "Ibadan Electricity Distribution",
] as const;

export const CABLE_PROVIDERS = ["DStv", "GOtv", "StarTimes"] as const;

export const CABLE_PACKAGE = {
  provider: "DStv",
  name: "DStv Demo Family",
  cycle: "1 month",
  price: 5000,
} as const;

export const EXAM_BODIES = ["WAEC", "NECO", "NABTEB"] as const;

export const EXAM_PIN = {
  body: "WAEC",
  product: "WAEC result checker · Demo product",
  quantity: 2,
  unitPrice: 3500,
} as const;

export const SMS = {
  senderId: "ADADEMO",
  recipients: 20,
  segmentsPerRecipient: 1,
  unitCost: 4,
  message:
    "Hello! Your community meeting is on Saturday at 10am. Reply to your coordinator to confirm. Thank you.",
  encoding: "GSM-7",
  maxChars: 160,
} as const;

export const SMS_TOTAL = SMS.recipients * SMS.segmentsPerRecipient * SMS.unitCost;
