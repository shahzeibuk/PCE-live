import * as migration_20260319_013549_init_collections from './20260319_013549_init_collections'
import * as migration_20260329_branches_cell_phone from './20260329_120000_branches_cell_phone'

export const migrations = [
  {
    up: migration_20260319_013549_init_collections.up,
    down: migration_20260319_013549_init_collections.down,
    name: '20260319_013549_init_collections',
  },
  {
    up: migration_20260329_branches_cell_phone.up,
    down: migration_20260329_branches_cell_phone.down,
    name: '20260329_120000_branches_cell_phone',
  },
]
