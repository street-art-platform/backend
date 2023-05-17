alter table "public"."donation"
  add constraint "donation_donee_id_fkey"
  foreign key ("donee_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
