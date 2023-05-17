alter table "public"."street_arts"
  add constraint "street_arts_type_id_fkey"
  foreign key ("type_id")
  references "public"."art_type"
  ("id") on update restrict on delete restrict;
