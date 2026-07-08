import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "rate_type" varchar DEFAULT 'open_market' NOT NULL;
  UPDATE "currency_rates" SET "rate_type" = 'open_market' WHERE "rate_type" IS NULL;
  DROP INDEX IF EXISTS "currency_rates_currency_code_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "currency_rates_currency_code_rate_type_idx"
    ON "currency_rates" USING btree ("currency_code", "rate_type");
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "interbank_buy_rate";
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "interbank_sell_rate";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "currency_rates_currency_code_rate_type_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "currency_rates_currency_code_idx"
    ON "currency_rates" USING btree ("currency_code");
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "rate_type";
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "interbank_buy_rate" numeric;
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "interbank_sell_rate" numeric;`)
}
