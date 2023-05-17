alter table "public"."followers" alter column "followee_id" drop not null;
alter table "public"."followers" add column "followee_id" int4;
