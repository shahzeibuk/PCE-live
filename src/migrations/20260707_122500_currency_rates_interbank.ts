import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "interbank_buy_rate" numeric;
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "interbank_sell_rate" numeric;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "interbank_buy_rate";
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "interbank_sell_rate";`)
}
