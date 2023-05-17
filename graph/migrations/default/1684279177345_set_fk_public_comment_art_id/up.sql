alter table "public"."comment"
  add constraint "comment_art_id_fkey"
  foreign key ("art_id")
  references "public"."street_arts"
  ("id") on update restrict on delete restrict;
