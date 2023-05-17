alter table "public"."comment" alter column "art_id" drop not null;
alter table "public"."comment" add column "art_id" int4;
