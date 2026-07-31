import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Global admin toggle for the live open-market FX API.
 * Default api_enabled = true so existing behaviour is unchanged until turned off.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "currency_rates_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"api_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  INSERT INTO "currency_rates_settings" ("api_enabled", "updated_at", "created_at")
  SELECT true, now(), now()
  WHERE NOT EXISTS (SELECT 1 FROM "currency_rates_settings" LIMIT 1);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "currency_rates_settings" CASCADE;`)
}
