CREATE TABLE "public"."followers" ("id" serial NOT NULL, "followee_id" integer NOT NULL, "follower_id" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
