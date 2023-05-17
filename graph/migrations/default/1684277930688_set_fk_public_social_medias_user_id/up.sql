alter table "public"."social_medias"
  add constraint "social_medias_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
