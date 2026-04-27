import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_contact_lines_icon" AS ENUM('phone', 'mobile');
  CREATE TABLE "header_contact_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"tel_href" varchar NOT NULL,
  	"icon" "enum_header_contact_lines_icon" DEFAULT 'phone'
  );
  
  ALTER TABLE "promo_banner" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_alt" varchar DEFAULT 'Pakistan Currency Exchange — official logo';
  ALTER TABLE "header" ADD COLUMN "cta_label" varchar DEFAULT 'Get Live Rates' NOT NULL;
  ALTER TABLE "header" ADD COLUMN "cta_url" varchar DEFAULT '/currency-rates' NOT NULL;
  ALTER TABLE "header_contact_lines" ADD CONSTRAINT "header_contact_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_contact_lines_order_idx" ON "header_contact_lines" USING btree ("_order");
  CREATE INDEX "header_contact_lines_parent_id_idx" ON "header_contact_lines" USING btree ("_parent_id");
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_contact_lines" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_contact_lines" CASCADE;
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  ALTER TABLE "promo_banner" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "logo_alt";
  ALTER TABLE "header" DROP COLUMN "cta_label";
  ALTER TABLE "header" DROP COLUMN "cta_url";
  DROP TYPE "public"."enum_header_contact_lines_icon";`)
}
