alter table "public"."like"
  add constraint "like_art_id_fkey"
  foreign key ("art_id")
  references "public"."street_arts"
  ("id") on update restrict on delete restrict;
