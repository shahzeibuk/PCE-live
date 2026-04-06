/**
 * Migrations run via Payload (`pnpm payload migrate`) and `prodMigrations` on boot in production.
 * The large baseline schema script `20260319_013549_init_collections` is executed separately from
 * `payload.config.ts` `onInit` in development — it must NOT be listed here, or existing databases
 * would try to re-run CREATE TABLE and fail.
 */
import * as migration_20260329_branches_cell_phone from './20260329_120000_branches_cell_phone'

export const migrations = [
  {
    up: migration_20260329_branches_cell_phone.up,
    down: migration_20260329_branches_cell_phone.down,
    name: '20260329_120000_branches_cell_phone',
  },
]
