import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "site_branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"favicon_id" integer,
  	"favicon_svg_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "site_branding" ADD CONSTRAINT "site_branding_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_branding" ADD CONSTRAINT "site_branding_favicon_svg_id_media_id_fk" FOREIGN KEY ("favicon_svg_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_branding_favicon_idx" ON "site_branding" USING btree ("favicon_id");
  CREATE INDEX "site_branding_favicon_svg_idx" ON "site_branding" USING btree ("favicon_svg_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "site_branding" CASCADE;`)
}
