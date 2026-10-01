export interface BudgetTier {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export interface CountryBudgetConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  tiers: BudgetTier[];
}

/**
 * Centrally managed country and budget threshold configuration.
 * Localized realistically for agency retainers and client budgets in each market.
 * Easily extensible for any new countries or threshold updates.
 */
export const COUNTRY_BUDGET_CONFIGS: CountryBudgetConfig[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
    tiers: [
      { id: 'in-tier-1', label: '< ₹25,000 / mo', min: 0, max: 25000 },
      { id: 'in-tier-2', label: '₹25,000 - ₹50,000 / mo', min: 25000, max: 50000 },
      { id: 'in-tier-3', label: '₹50,000 - ₹1,00,000 / mo', min: 50000, max: 100000 },
      { id: 'in-tier-4', label: '₹1,00,000+ / mo', min: 100000, max: null },
    ],
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      { id: 'us-tier-1', label: '< $2,000 / mo', min: 0, max: 2000 },
      { id: 'us-tier-2', label: '$2,000 - $4,500 / mo', min: 2000, max: 4500 },
      { id: 'us-tier-3', label: '$4,500 - $8,500 / mo', min: 4500, max: 8500 },
      { id: 'us-tier-4', label: '$8,500+ / mo', min: 8500, max: null },
    ],
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    tiers: [
      { id: 'gb-tier-1', label: '< £1,500 / mo', min: 0, max: 1500 },
      { id: 'gb-tier-2', label: '£1,500 - £3,500 / mo', min: 1500, max: 3500 },
      { id: 'gb-tier-3', label: '£3,500 - £7,000 / mo', min: 3500, max: 7000 },
      { id: 'gb-tier-4', label: '£7,000+ / mo', min: 7000, max: null },
    ],
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'CA$',
    tiers: [
      { id: 'ca-tier-1', label: '< CA$2,500 / mo', min: 0, max: 2500 },
      { id: 'ca-tier-2', label: 'CA$2,500 - CA$5,500 / mo', min: 2500, max: 5500 },
      { id: 'ca-tier-3', label: 'CA$5,500 - CA$10,000 / mo', min: 5500, max: 10000 },
      { id: 'ca-tier-4', label: 'CA$10,000+ / mo', min: 10000, max: null },
    ],
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    tiers: [
      { id: 'au-tier-1', label: '< A$2,800 / mo', min: 0, max: 2800 },
      { id: 'au-tier-2', label: 'A$2,800 - A$6,000 / mo', min: 2800, max: 6000 },
      { id: 'au-tier-3', label: 'A$6,000 - A$12,000 / mo', min: 6000, max: 12000 },
      { id: 'au-tier-4', label: 'A$12,000+ / mo', min: 12000, max: null },
    ],
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED',
    tiers: [
      { id: 'ae-tier-1', label: '< 7,500 AED / mo', min: 0, max: 7500 },
      { id: 'ae-tier-2', label: '7,500 - 18,000 AED / mo', min: 7500, max: 18000 },
      { id: 'ae-tier-3', label: '18,000 - 35,000 AED / mo', min: 18000, max: 35000 },
      { id: 'ae-tier-4', label: '35,000+ AED / mo', min: 35000, max: null },
    ],
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: 'SAR',
    currencySymbol: 'SAR',
    tiers: [
      { id: 'sa-tier-1', label: '< 7,500 SAR / mo', min: 0, max: 7500 },
      { id: 'sa-tier-2', label: '7,500 - 18,000 SAR / mo', min: 7500, max: 18000 },
      { id: 'sa-tier-3', label: '18,000 - 35,000 SAR / mo', min: 18000, max: 35000 },
      { id: 'sa-tier-4', label: '35,000+ SAR / mo', min: 35000, max: null },
    ],
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    currencySymbol: 'S$',
    tiers: [
      { id: 'sg-tier-1', label: '< S$2,500 / mo', min: 0, max: 2500 },
      { id: 'sg-tier-2', label: 'S$2,500 - S$5,500 / mo', min: 2500, max: 5500 },
      { id: 'sg-tier-3', label: 'S$5,500 - S$10,000 / mo', min: 5500, max: 10000 },
      { id: 'sg-tier-4', label: 'S$10,000+ / mo', min: 10000, max: null },
    ],
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    currency: 'THB',
    currencySymbol: '฿',
    tiers: [
      { id: 'th-tier-1', label: '< ฿30,000 / mo', min: 0, max: 30000 },
      { id: 'th-tier-2', label: '฿30,000 - ฿70,000 / mo', min: 30000, max: 70000 },
      { id: 'th-tier-3', label: '฿70,000 - ฿150,000 / mo', min: 70000, max: 150000 },
      { id: 'th-tier-4', label: '฿150,000+ / mo', min: 150000, max: null },
    ],
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      { id: 'de-tier-1', label: '< €1,800 / mo', min: 0, max: 1800 },
      { id: 'de-tier-2', label: '€1,800 - €4,000 / mo', min: 1800, max: 4000 },
      { id: 'de-tier-3', label: '€4,000 - €8,000 / mo', min: 4000, max: 8000 },
      { id: 'de-tier-4', label: '€8,000+ / mo', min: 8000, max: null },
    ],
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      { id: 'fr-tier-1', label: '< €1,800 / mo', min: 0, max: 1800 },
      { id: 'fr-tier-2', label: '€1,800 - €4,000 / mo', min: 1800, max: 4000 },
      { id: 'fr-tier-3', label: '€4,000 - €8,000 / mo', min: 4000, max: 8000 },
      { id: 'fr-tier-4', label: '€8,000+ / mo', min: 8000, max: null },
    ],
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      { id: 'nl-tier-1', label: '< €1,800 / mo', min: 0, max: 1800 },
      { id: 'nl-tier-2', label: '€1,800 - €4,000 / mo', min: 1800, max: 4000 },
      { id: 'nl-tier-3', label: '€4,000 - €8,000 / mo', min: 4000, max: 8000 },
      { id: 'nl-tier-4', label: '€8,000+ / mo', min: 8000, max: null },
    ],
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      { id: 'es-tier-1', label: '< €1,500 / mo', min: 0, max: 1500 },
      { id: 'es-tier-2', label: '€1,500 - €3,500 / mo', min: 1500, max: 3500 },
      { id: 'es-tier-3', label: '€3,500 - €7,000 / mo', min: 3500, max: 7000 },
      { id: 'es-tier-4', label: '€7,000+ / mo', min: 7000, max: null },
    ],
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      { id: 'it-tier-1', label: '< €1,500 / mo', min: 0, max: 1500 },
      { id: 'it-tier-2', label: '€1,500 - €3,500 / mo', min: 1500, max: 3500 },
      { id: 'it-tier-3', label: '€3,500 - €7,000 / mo', min: 3500, max: 7000 },
      { id: 'it-tier-4', label: '€7,000+ / mo', min: 7000, max: null },
    ],
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    currency: 'MYR',
    currencySymbol: 'RM',
    tiers: [
      { id: 'my-tier-1', label: '< RM 4,500 / mo', min: 0, max: 4500 },
      { id: 'my-tier-2', label: 'RM 4,500 - RM 10,000 / mo', min: 4500, max: 10000 },
      { id: 'my-tier-3', label: 'RM 10,000 - RM 22,000 / mo', min: 10000, max: 22000 },
      { id: 'my-tier-4', label: 'RM 22,000+ / mo', min: 22000, max: null },
    ],
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    currency: 'IDR',
    currencySymbol: 'Rp',
    tiers: [
      { id: 'id-tier-1', label: '< Rp 15 Juta / mo', min: 0, max: 15000000 },
      { id: 'id-tier-2', label: 'Rp 15 - Rp 35 Juta / mo', min: 15000000, max: 35000000 },
      { id: 'id-tier-3', label: 'Rp 35 - Rp 75 Juta / mo', min: 35000000, max: 75000000 },
      { id: 'id-tier-4', label: 'Rp 75 Juta+ / mo', min: 75000000, max: null },
    ],
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    currency: 'PHP',
    currencySymbol: '₱',
    tiers: [
      { id: 'ph-tier-1', label: '< ₱50,000 / mo', min: 0, max: 50000 },
      { id: 'ph-tier-2', label: '₱50,000 - ₱120,000 / mo', min: 50000, max: 120000 },
      { id: 'ph-tier-3', label: '₱120,000 - ₱250,000 / mo', min: 120000, max: 250000 },
      { id: 'ph-tier-4', label: '₱250,000+ / mo', min: 250000, max: null },
    ],
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    currency: 'VND',
    currencySymbol: '₫',
    tiers: [
      { id: 'vn-tier-1', label: '< 25 Triệu ₫ / mo', min: 0, max: 25000000 },
      { id: 'vn-tier-2', label: '25 - 60 Triệu ₫ / mo', min: 25000000, max: 60000000 },
      { id: 'vn-tier-3', label: '60 - 130 Triệu ₫ / mo', min: 60000000, max: 130000000 },
      { id: 'vn-tier-4', label: '130 Triệu ₫+ / mo', min: 130000000, max: null },
    ],
  },
];

export const DEFAULT_COUNTRY_CODE = 'IN';

export function getCountryBudgetConfig(countryCode: string): CountryBudgetConfig {
  const match = COUNTRY_BUDGET_CONFIGS.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return match || COUNTRY_BUDGET_CONFIGS[0];
}
