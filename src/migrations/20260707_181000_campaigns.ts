import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer NOT NULL,
  	"link_url" varchar,
  	"published_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "campaigns_id" integer;
  ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "campaigns_image_idx" ON "campaigns" USING btree ("image_id");
  CREATE INDEX "campaigns_updated_at_idx" ON "campaigns" USING btree ("updated_at");
  CREATE INDEX "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaigns_fk" FOREIGN KEY ("campaigns_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("campaigns_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_campaigns_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_campaigns_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "campaigns_id";
  DROP TABLE IF EXISTS "campaigns" CASCADE;`)
}
