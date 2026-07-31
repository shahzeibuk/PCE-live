import * as migration_20260319_013549_init_collections from './20260319_013549_init_collections';
import * as migration_20260329_120000_branches_cell_phone from './20260329_120000_branches_cell_phone';
import * as migration_20260422_135250_home_hero_global from './20260422_135250_home_hero_global';
import * as migration_20260422_144052 from './20260422_144052';
import * as migration_20260422_151043 from './20260422_151043';
import * as migration_20260422_152055 from './20260422_152055';
import * as migration_20260427_020353 from './20260427_020353';
import * as migration_20260427_022032 from './20260427_022032';
import * as migration_20260608_120000_site_branding from './20260608_120000_site_branding';
import * as migration_20260608_140000_user_roles from './20260608_140000_user_roles';
import * as migration_20260701_095141_financial_reports from './20260701_095141_financial_reports';
import * as migration_20260707_122500_currency_rates_interbank from './20260707_122500_currency_rates_interbank';
import * as migration_20260707_173000_currency_rates_rate_type from './20260707_173000_currency_rates_rate_type';
import * as migration_20260707_174500_currency_rates_rate_category from './20260707_174500_currency_rates_rate_category';
import * as migration_20260707_181000_campaigns from './20260707_181000_campaigns';
import * as migration_20260708_073000_currency_rates_rate_category_fix from './20260708_073000_currency_rates_rate_category_fix';
import * as migration_20260720_120000_seed_services_pages from './20260720_120000_seed_services_pages';
import * as migration_20260720_130000_seed_service_icons_and_contact from './20260720_130000_seed_service_icons_and_contact';
import * as migration_20260720_140000_use_static_partner_service_icons from './20260720_140000_use_static_partner_service_icons';
import * as migration_20260720_150000_seed_currency_rates from './20260720_150000_seed_currency_rates';
import * as migration_20260731_060000_currency_rates_settings from './20260731_060000_currency_rates_settings';
import * as migration_20260731_061500_activity_logs from './20260731_061500_activity_logs';

export const migrations = [
  {
    up: migration_20260319_013549_init_collections.up,
    down: migration_20260319_013549_init_collections.down,
    name: '20260319_013549_init_collections',
  },
  {
    up: migration_20260329_120000_branches_cell_phone.up,
    down: migration_20260329_120000_branches_cell_phone.down,
    name: '20260329_120000_branches_cell_phone',
  },
  {
    up: migration_20260422_135250_home_hero_global.up,
    down: migration_20260422_135250_home_hero_global.down,
    name: '20260422_135250_home_hero_global',
  },
  {
    up: migration_20260422_144052.up,
    down: migration_20260422_144052.down,
    name: '20260422_144052',
  },
  {
    up: migration_20260422_151043.up,
    down: migration_20260422_151043.down,
    name: '20260422_151043',
  },
  {
    up: migration_20260422_152055.up,
    down: migration_20260422_152055.down,
    name: '20260422_152055',
  },
  {
    up: migration_20260427_020353.up,
    down: migration_20260427_020353.down,
    name: '20260427_020353',
  },
  {
    up: migration_20260427_022032.up,
    down: migration_20260427_022032.down,
    name: '20260427_022032',
  },
  {
    up: migration_20260608_120000_site_branding.up,
    down: migration_20260608_120000_site_branding.down,
    name: '20260608_120000_site_branding',
  },
  {
    up: migration_20260608_140000_user_roles.up,
    down: migration_20260608_140000_user_roles.down,
    name: '20260608_140000_user_roles',
  },
  {
    up: migration_20260701_095141_financial_reports.up,
    down: migration_20260701_095141_financial_reports.down,
    name: '20260701_095141_financial_reports'
  },
  {
    up: migration_20260707_122500_currency_rates_interbank.up,
    down: migration_20260707_122500_currency_rates_interbank.down,
    name: '20260707_122500_currency_rates_interbank',
  },
  {
    up: migration_20260707_173000_currency_rates_rate_type.up,
    down: migration_20260707_173000_currency_rates_rate_type.down,
    name: '20260707_173000_currency_rates_rate_type',
  },
  {
    up: migration_20260707_174500_currency_rates_rate_category.up,
    down: migration_20260707_174500_currency_rates_rate_category.down,
    name: '20260707_174500_currency_rates_rate_category',
  },
  {
    up: migration_20260707_181000_campaigns.up,
    down: migration_20260707_181000_campaigns.down,
    name: '20260707_181000_campaigns',
  },
  {
    up: migration_20260708_073000_currency_rates_rate_category_fix.up,
    down: migration_20260708_073000_currency_rates_rate_category_fix.down,
    name: '20260708_073000_currency_rates_rate_category_fix',
  },
  {
    up: migration_20260720_120000_seed_services_pages.up,
    down: migration_20260720_120000_seed_services_pages.down,
    name: '20260720_120000_seed_services_pages',
  },
  {
    up: migration_20260720_130000_seed_service_icons_and_contact.up,
    down: migration_20260720_130000_seed_service_icons_and_contact.down,
    name: '20260720_130000_seed_service_icons_and_contact',
  },
  {
    up: migration_20260720_140000_use_static_partner_service_icons.up,
    down: migration_20260720_140000_use_static_partner_service_icons.down,
    name: '20260720_140000_use_static_partner_service_icons',
  },
  {
    up: migration_20260720_150000_seed_currency_rates.up,
    down: migration_20260720_150000_seed_currency_rates.down,
    name: '20260720_150000_seed_currency_rates',
  },
  {
    up: migration_20260731_060000_currency_rates_settings.up,
    down: migration_20260731_060000_currency_rates_settings.down,
    name: '20260731_060000_currency_rates_settings',
  },
  {
    up: migration_20260731_061500_activity_logs.up,
    down: migration_20260731_061500_activity_logs.down,
    name: '20260731_061500_activity_logs',
  },
];
