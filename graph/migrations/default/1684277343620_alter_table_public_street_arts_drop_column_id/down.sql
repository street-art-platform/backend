alter table "public"."street_arts" alter column "id" set default nextval('street_arts_id_seq'::regclass);
alter table "public"."street_arts" alter column "id" drop not null;
alter table "public"."street_arts" add column "id" int4;
