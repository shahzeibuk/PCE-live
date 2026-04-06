-- Run once on your Postgres DB if builds hang on:
-- "It looks like you've run Payload in dev mode..."
-- (Drizzle `push` in dev records migrations with batch = -1.)
DELETE FROM payload_migrations WHERE batch = -1;
