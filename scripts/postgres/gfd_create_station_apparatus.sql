DROP TABLE IF EXISTS station_apparatus CASCADE;
CREATE TABLE "station_apparatus" (
        "sa_id" serial NOT NULL UNIQUE,
        "station_id" varchar NOT NULL,
        "apparatus_id" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "station_apparatus" ADD CONSTRAINT "station_appa_fk0" FOREIGN KEY ("station_id") REFERENCES "stations"("station_id");
ALTER TABLE "station_apparatus" ADD CONSTRAINT "station_appa_fk1" FOREIGN KEY ("apparatus_id") REFERENCES "apparatus"("apparatus_id");
