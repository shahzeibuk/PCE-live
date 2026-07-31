import type { GlobalConfig } from 'payload'

import { canManageRates } from '@/access/roles'

/**
 * Admin switch for the external open-market FX API (open.er-api.com).
 * When off: no auto-sync, cron sync, admin sync, or live API fallback —
 * pages continue to show rates already saved in Currency Rates.
 */
export const CurrencyRatesSettings: GlobalConfig = {
  slug: 'currency-rates-settings',
  label: 'Currency API settings',
  admin: {
    group: 'Website',
    description:
      'Turn the live currency exchange API on or off. Manual buy/sell values in Currency Rates are always used when the API is disabled.',
  },
  access: {
    read: () => true,
    update: canManageRates,
  },
  fields: [
    {
      name: 'apiEnabled',
      type: 'checkbox',
      label: 'Enable live currency API',
      defaultValue: true,
      admin: {
        description:
          'When enabled, open-market rates can sync from the external FX API (admin Sync, cron, and stale auto-refresh). When disabled, only CMS-stored rates are used — no external API calls.',
      },
    },
  ],
}
