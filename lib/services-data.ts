/**
 * BAO Group service data — the architect directory and the BAO 360 laundry
 * booking. Every professional here is fictional and labelled as such on the
 * screen, because a directory that looks real implies vetting that this demo
 * does not perform.
 */

export type Architect = {
  id: string;
  name: string;
  initials: string;
  speciality: string;
  location: string;
  format: string;
  blurb: string;
};

export const ARCHITECTS: Architect[] = [
  {
    id: "damilola-abdulkadir",
    name: "Damilola Abdulkadir",
    initials: "DA",
    speciality: "Residential design & renovation",
    location: "Lagos",
    format: "Remote consultation",
    blurb:
      "A fictional profile demonstrating concept design, space planning, renovation feasibility and real estate advice.",
  },
  {
    id: "tunde-bello",
    name: "Tunde Bello",
    initials: "TB",
    speciality: "Commercial spaces & fit-outs",
    location: "Lagos",
    format: "Remote consultation",
    blurb:
      "A fictional profile demonstrating office, retail and hospitality fit-out concepts.",
  },
  {
    id: "nneka-eze",
    name: "Nneka Eze",
    initials: "NE",
    speciality: "Space planning & property concepts",
    location: "Abuja",
    format: "Remote consultation",
    blurb:
      "A fictional profile demonstrating space planning and early-stage property concepts.",
  },
];

export const ARCH_REQUEST = {
  id: "ARC-261018-004",
  title: "Asokoro home renovation",
  submitted: "18 Oct 2026 · 11:20 AM WAT",
  professional: "Damilola Abdulkadir",
  scope: "Residential renovation · Asokoro, FCT Abuja",
  budget: "₦5m–₦10m · Demo range",
  brief:
    "Rework the living and kitchen layout of a three-bedroom home. Explore better daylight, storage and a small rear extension. Start with a feasibility conversation and concept scope.",
  attachment: "floor-plan-demo.pdf · 1.2 MB",
  preferredContact: "In-app messages",
  requestedTime: "21 Oct · 02:00–03:00 PM WAT",
} as const;

export const LAUNDRY_ITEMS = [
  { label: "Shirts", unit: 1200, qty: 4 },
  { label: "Trousers", unit: 1500, qty: 2 },
  { label: "Bedsheet", unit: 2500, qty: 1 },
] as const;

export const LAUNDRY_DELIVERY = 1500;
export const LAUNDRY_SUBTOTAL = LAUNDRY_ITEMS.reduce((sum, i) => sum + i.unit * i.qty, 0);
export const LAUNDRY_TOTAL = LAUNDRY_SUBTOTAL + LAUNDRY_DELIVERY;
export const LAUNDRY_COUNT = LAUNDRY_ITEMS.reduce((sum, i) => sum + i.qty, 0);

export const LAUNDRY_BOOKING = {
  reference: "BAO-261018-007",
  submitted: "18 Oct 2026 · 11:35 AM WAT",
  service: "Wash & iron",
  address: "••• 4th Avenue Gwarimpa, FCT Abuja",
  contact: "Ada Okafor · +234 803 ••• 4421",
  pickupDate: "20 Oct 2026",
  pickupWindow: "10:00 AM–12:00 PM WAT",
  returnDate: "22 Oct 2026",
  returnWindow: "04:00–06:00 PM WAT",
  careNotes: "Light starch on shirts. Please separate the white bedsheet from coloured items.",
} as const;
