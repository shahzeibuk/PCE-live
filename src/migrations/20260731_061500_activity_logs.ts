import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Admin “User activity log” — who created/updated/deleted which content, and when.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DO $$ BEGIN
    CREATE TYPE "public"."enum_activity_logs_action" AS ENUM('create', 'update', 'delete');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  CREATE TABLE IF NOT EXISTS "activity_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar NOT NULL,
  	"user_id" integer,
  	"user_email" varchar,
  	"action" "enum_activity_logs_action" NOT NULL,
  	"resource" varchar NOT NULL,
  	"document_id" varchar,
  	"document_title" varchar,
  	"page_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;

  CREATE INDEX IF NOT EXISTS "activity_logs_user_idx" ON "activity_logs" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "activity_logs_updated_at_idx" ON "activity_logs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "activity_logs_created_at_idx" ON "activity_logs" USING btree ("created_at");

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "activity_logs_id" integer;
  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activity_logs_fk"
      FOREIGN KEY ("activity_logs_id") REFERENCES "public"."activity_logs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_activity_logs_id_idx"
    ON "payload_locked_documents_rels" USING btree ("activity_logs_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_activity_logs_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_activity_logs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "activity_logs_id";
  DROP TABLE IF EXISTS "activity_logs" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_activity_logs_action";
  `)
}
