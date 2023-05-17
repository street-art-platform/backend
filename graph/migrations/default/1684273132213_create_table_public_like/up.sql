CREATE TABLE "public"."like" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" UUID NOT NULL, "art_id" uuid NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
