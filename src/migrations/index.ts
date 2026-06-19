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
    name: '20260427_022032'
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
];
