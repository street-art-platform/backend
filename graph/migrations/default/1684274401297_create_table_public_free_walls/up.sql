CREATE TABLE "public"."free_walls" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "title" text NOT NULL, "description" text, "picture" text NOT NULL, "is_occupied" boolean NOT NULL, "address" text, "city" text NOT NULL, "street" text NOT NULL, "post_code" text NOT NULL, "country" text NOT NULL, "latitude" text, "logitude" text, "created_at" timestamptz DEFAULT now(), "updated_at" timestamptz DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_free_walls_updated_at"
BEFORE UPDATE ON "public"."free_walls"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_free_walls_updated_at" ON "public"."free_walls"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
