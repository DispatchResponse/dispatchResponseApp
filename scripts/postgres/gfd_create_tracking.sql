DROP TABLE IF EXISTS tracking CASCADE;
CREATE TABLE "tracking" (
        "tracking_id" serial NOT NULL UNIQUE,
        "user_id" integer NOT NULL,
        "apparatus_id" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "tracking" ADD CONSTRAINT "tracking_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_fk1" FOREIGN KEY ("apparatus_id") REFERENCES "apparatus"("apparatus_id");
