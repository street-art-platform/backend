alter table "public"."followers" alter column "follower_id" drop not null;
alter table "public"."followers" add column "follower_id" int4;
