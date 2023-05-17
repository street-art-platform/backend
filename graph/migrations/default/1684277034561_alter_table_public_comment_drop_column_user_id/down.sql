alter table "public"."comment" alter column "user_id" drop not null;
alter table "public"."comment" add column "user_id" int4;
