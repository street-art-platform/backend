alter table "public"."social_medias" alter column "id" set default nextval('social_medias_id_seq'::regclass);
alter table "public"."social_medias" alter column "id" drop not null;
alter table "public"."social_medias" add column "id" int4;
