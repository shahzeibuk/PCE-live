import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "financial_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"report_file_id" integer NOT NULL,
  	"published_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "financial_reports_id" integer;
  ALTER TABLE "financial_reports" ADD CONSTRAINT "financial_reports_report_file_id_media_id_fk" FOREIGN KEY ("report_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "financial_reports_report_file_idx" ON "financial_reports" USING btree ("report_file_id");
  CREATE INDEX "financial_reports_updated_at_idx" ON "financial_reports" USING btree ("updated_at");
  CREATE INDEX "financial_reports_created_at_idx" ON "financial_reports" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_financial_reports_fk" FOREIGN KEY ("financial_reports_id") REFERENCES "public"."financial_reports"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_financial_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("financial_reports_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_financial_reports_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_financial_reports_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "financial_reports_id";
  DROP TABLE IF EXISTS "financial_reports" CASCADE;`)
}
