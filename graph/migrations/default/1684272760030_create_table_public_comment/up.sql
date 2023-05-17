CREATE TABLE "public"."comment" ("id" serial NOT NULL, "user_id" integer NOT NULL, "art_id" integer NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
