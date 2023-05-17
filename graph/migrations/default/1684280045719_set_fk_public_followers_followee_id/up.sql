alter table "public"."followers"
  add constraint "followers_followee_id_fkey"
  foreign key ("followee_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
