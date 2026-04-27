import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "home_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently Asked Questions (FAQs)' NOT NULL,
  	"subheading" varchar DEFAULT 'Pakistan Currency Exchange',
  	"initial_visible_count" numeric DEFAULT 5 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );

  ALTER TABLE "home_faq_items" ADD CONSTRAINT "home_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_faq_items_order_idx" ON "home_faq_items" USING btree ("_order");
  CREATE INDEX "home_faq_items_parent_id_idx" ON "home_faq_items" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "home_faq_items" CASCADE;
  DROP TABLE "home_faq" CASCADE;`)
}
