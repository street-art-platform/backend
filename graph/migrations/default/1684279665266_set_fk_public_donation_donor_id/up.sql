alter table "public"."donation"
  add constraint "donation_donor_id_fkey"
  foreign key ("donor_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
