CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."users" add column "id" uuid
 not null unique default gen_random_uuid();
