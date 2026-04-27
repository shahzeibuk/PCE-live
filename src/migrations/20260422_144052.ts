import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "home_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Our services' NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE "home_services_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );

  ALTER TABLE "home_services_boxes" ADD CONSTRAINT "home_services_boxes_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE restrict ON UPDATE no action;
  ALTER TABLE "home_services_boxes" ADD CONSTRAINT "home_services_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_services_boxes_order_idx" ON "home_services_boxes" USING btree ("_order");
  CREATE INDEX "home_services_boxes_parent_id_idx" ON "home_services_boxes" USING btree ("_parent_id");
  CREATE INDEX "home_services_boxes_icon_idx" ON "home_services_boxes" USING btree ("icon_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "home_services_boxes" CASCADE;
  DROP TABLE "home_services" CASCADE;`)
}
