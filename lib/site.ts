// ============ EDIT ME: everything that changes lives in this file ============
export const SITE = {
  name: 'Huoma Medicinals',
  supplier: 'Huoma Biomedical (Shanghai) Co., Ltd.',
  email: 'hello@your-domain.com', // shown on the site
  delivery: 'Typical delivery: 7 to 14 days (to be confirmed with the supplier).',
  shippingCents: 0, // flat shipping in cents. 0 = shipping included
};

// ---- Legal details shown on the policy pages. Fill these in before launch. ----
export const LEGAL = {
  tradingName: 'Huoma Medicinals',
  sellerName: 'Huoma Biomedical (Shanghai) Co., Ltd.', // the business that sells and ships the goods
  abn: '[ABN to be added]', // your / the seller's ABN (or Chinese business registration details)
  address: '[Business address to be added]',
  privacyEmail: 'hello@your-domain.com',
  governingLaw: 'South Australia',
  returnWindowDays: 14, // change-of-mind window for unused, unopened, non-electrical goods
  lastUpdated: '13 October 2026',
};

export type Product = {
  id: string;
  name: string;
  priceCents: number;
  blurb: string;
  tint: 'one' | 'two' | 'three';
  icon: string; // simple line drawing, used until you add a real photo
  image?: string; // optional: put a photo in /public/products and set e.g. '/products/foot-spa.jpg'
};

export const PRODUCTS: Product[] = [
  {
    id: 'mr-detox-foot-spa-powder',
    name: 'Mr. Detox Foot Spa Powder',
    priceCents: 2400, // placeholder price: set the real one
    blurb: 'A foot spa powder you dissolve in warm water for a calm 30-minute soak at the end of the day.',
    tint: 'one',
    icon: 'M4 30h40M8 30c0 8 6 12 16 12s16-4 16-12M14 22c0-4 3-4 3-8M24 22c0-4 3-4 3-8M34 22c0-4 3-4 3-8',
  },
];

export const STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'] as const;

export function money(cents: number) {
  return 'A$' + (cents / 100).toFixed(2).replace(/\.00$/, '');
}

export function orderNumber(id: number) {
  return 'HM-' + String(id).padStart(5, '0');
}
