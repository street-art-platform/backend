alter table "public"."art_type" alter column "id" set default nextval('art_type_id_seq'::regclass);
alter table "public"."art_type" alter column "id" drop not null;
alter table "public"."art_type" add column "id" int4;
