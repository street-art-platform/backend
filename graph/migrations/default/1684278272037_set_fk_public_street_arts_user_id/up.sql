alter table "public"."street_arts"
  add constraint "street_arts_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
