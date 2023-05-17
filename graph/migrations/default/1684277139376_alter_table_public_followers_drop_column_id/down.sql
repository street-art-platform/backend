alter table "public"."followers" alter column "id" set default nextval('followers_id_seq'::regclass);
alter table "public"."followers" alter column "id" drop not null;
alter table "public"."followers" add column "id" int4;
