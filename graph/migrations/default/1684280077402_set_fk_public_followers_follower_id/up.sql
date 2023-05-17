alter table "public"."followers"
  add constraint "followers_follower_id_fkey"
  foreign key ("follower_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
