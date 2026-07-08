import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "currency_rates_currency_code_rate_type_idx";
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "rate_type";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "currency_rates" ADD COLUMN IF NOT EXISTS "rate_type" varchar DEFAULT 'open_market' NOT NULL;
  UPDATE "currency_rates" SET "rate_type" = CASE
    WHEN "rate_category" = 'sbp' THEN 'interbank'
    ELSE 'open_market'
  END;
  CREATE UNIQUE INDEX IF NOT EXISTS "currency_rates_currency_code_rate_type_idx"
    ON "currency_rates" USING btree ("currency_code", "rate_type");`)
}
