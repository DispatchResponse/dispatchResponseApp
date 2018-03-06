DROP TABLE IF EXISTS tracking CASCADE;
CREATE TABLE "tracking" (
        "trackingId" serial NOT NULL UNIQUE,
        "userId" integer NOT NULL,
        "apparatusId" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "tracking" ADD CONSTRAINT "tracking_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_fk1" FOREIGN KEY ("apparatusId") REFERENCES "apparatus"("apparatusId");
