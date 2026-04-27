import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_home_hero_primary_cta_link_type" AS ENUM('reference', 'custom');

  CREATE TABLE "home_hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_cta_button_label" varchar DEFAULT 'Check Today''s Rates' NOT NULL,
  	"primary_cta_link_type" "enum_home_hero_primary_cta_link_type" DEFAULT 'reference',
  	"primary_cta_link_new_tab" boolean,
  	"primary_cta_link_url" varchar,
  	"secondary_cta_button_label" varchar DEFAULT 'WhatsApp for Best Rate' NOT NULL,
  	"secondary_cta_url" varchar DEFAULT 'https://wa.me/923046668810' NOT NULL,
  	"secondary_cta_open_in_new_tab" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_hero_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"eyebrow" varchar DEFAULT 'Pakistan Currency Exchange',
  	"heading" varchar NOT NULL,
  	"lead_short" varchar,
  	"lead" varchar
  );

  CREATE TABLE "home_hero_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );

  ALTER TABLE "home_hero_banners" ADD CONSTRAINT "home_hero_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE restrict ON UPDATE no action;
  ALTER TABLE "home_hero_banners" ADD CONSTRAINT "home_hero_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_rels" ADD CONSTRAINT "home_hero_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_rels" ADD CONSTRAINT "home_hero_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_rels" ADD CONSTRAINT "home_hero_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_hero_banners_order_idx" ON "home_hero_banners" USING btree ("_order");
  CREATE INDEX "home_hero_banners_parent_id_idx" ON "home_hero_banners" USING btree ("_parent_id");
  CREATE INDEX "home_hero_banners_image_idx" ON "home_hero_banners" USING btree ("image_id");
  CREATE INDEX "home_hero_rels_order_idx" ON "home_hero_rels" USING btree ("order");
  CREATE INDEX "home_hero_rels_parent_idx" ON "home_hero_rels" USING btree ("parent_id");
  CREATE INDEX "home_hero_rels_path_idx" ON "home_hero_rels" USING btree ("path");
  CREATE INDEX "home_hero_rels_pages_id_idx" ON "home_hero_rels" USING btree ("pages_id");
  CREATE INDEX "home_hero_rels_posts_id_idx" ON "home_hero_rels" USING btree ("posts_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "home_hero_banners" CASCADE;
  DROP TABLE "home_hero_rels" CASCADE;
  DROP TABLE "home_hero" CASCADE;
  DROP TYPE "public"."enum_home_hero_primary_cta_link_type";`)
}
