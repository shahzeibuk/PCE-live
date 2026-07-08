import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Production was missing `rate_category` — prior migration only dropped `rate_type`.
 * Adds enum + column, backfills open_market, and restores compound unique index.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "enum_currency_rates_rate_category" AS ENUM ('open_market', 'sbp');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  ALTER TABLE "currency_rates"
    ADD COLUMN IF NOT EXISTS "rate_category" "enum_currency_rates_rate_category"
    DEFAULT 'open_market' NOT NULL;

  UPDATE "currency_rates"
  SET "rate_category" = 'open_market'
  WHERE "rate_category" IS NULL;

  DROP INDEX IF EXISTS "currency_rates_currency_code_rate_type_idx";
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "rate_type";

  DROP INDEX IF EXISTS "currency_rates_currency_code_idx";
  DROP INDEX IF EXISTS "currency_rates_currency_code_rate_category_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "currency_rates_currency_code_rate_category_idx"
    ON "currency_rates" USING btree ("currency_code", "rate_category");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "currency_rates_currency_code_rate_category_idx";
  CREATE UNIQUE INDEX IF NOT EXISTS "currency_rates_currency_code_idx"
    ON "currency_rates" USING btree ("currency_code");
  ALTER TABLE "currency_rates" DROP COLUMN IF EXISTS "rate_category";
  DROP TYPE IF EXISTS "enum_currency_rates_rate_category";`)
}
