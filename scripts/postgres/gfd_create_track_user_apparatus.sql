DROP TABLE IF EXISTS track_user_apparatus CASCADE;
CREATE TABLE "track_user_apparatus" (
        "ua_id" serial NOT NULL UNIQUE,
        "user_id" integer NOT NULL,
        "apparatus_id" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "track_user_apparatus" ADD CONSTRAINT "track_user_appa_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "track_user_apparatus" ADD CONSTRAINT "track_user_appa_fk1" FOREIGN KEY ("apparatus_id") REFERENCES "apparatus"("apparatus_id");
