import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/** Adds optional branch mobile; safe to re-run (IF NOT EXISTS). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`ALTER TABLE "branches" ADD COLUMN IF NOT EXISTS "cell_phone" varchar;`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "branches" DROP COLUMN IF EXISTS "cell_phone";`)
}
