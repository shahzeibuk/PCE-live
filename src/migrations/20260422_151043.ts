import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_home_why_us_items_icon" AS ENUM('shield', 'trending', 'lock', 'zap', 'users', 'map');

  CREATE TABLE "home_why_us" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Why Choose Pakistan Currency Exchange?' NOT NULL,
  	"subheading" varchar DEFAULT 'A smarter way to buy, sell, and receive currency across Pakistan.',
  	"image_id" integer,
  	"footer" varchar DEFAULT 'We are dedicated to making your currency exchange and remittance experience smooth, secure, and hassle-free.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_why_us_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_why_us_items_icon" DEFAULT 'shield' NOT NULL,
  	"text" varchar NOT NULL
  );

  ALTER TABLE "home_why_us" ADD CONSTRAINT "home_why_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_why_us_items" ADD CONSTRAINT "home_why_us_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_why_us"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_why_us_image_idx" ON "home_why_us" USING btree ("image_id");
  CREATE INDEX "home_why_us_items_order_idx" ON "home_why_us_items" USING btree ("_order");
  CREATE INDEX "home_why_us_items_parent_id_idx" ON "home_why_us_items" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "home_why_us_items" CASCADE;
  DROP TABLE "home_why_us" CASCADE;
  DROP TYPE "public"."enum_home_why_us_items_icon";`)
}
