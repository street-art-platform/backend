CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."social_medias" add column "id" uuid
 not null unique default gen_random_uuid();
