alter table "public"."pictures" alter column "art_id" drop not null;
alter table "public"."pictures" add column "art_id" int4;
