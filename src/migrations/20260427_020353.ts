import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_promo_banner_max_width" AS ENUM('max-w-md', 'max-w-lg', 'max-w-2xl', 'max-w-3xl', 'max-w-4xl');
  CREATE TABLE "promo_banner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"image_id" integer,
  	"image_alt" varchar DEFAULT 'Promotion' NOT NULL,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT true,
  	"dismissal_version" numeric DEFAULT 1 NOT NULL,
  	"max_width" "enum_promo_banner_max_width" DEFAULT 'max-w-2xl',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "promo_banner" ADD CONSTRAINT "promo_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "promo_banner_image_idx" ON "promo_banner" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "promo_banner" CASCADE;
  DROP TYPE "public"."enum_promo_banner_max_width";`)
}
