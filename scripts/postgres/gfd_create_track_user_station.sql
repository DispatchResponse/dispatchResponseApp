DROP TABLE IF EXISTS track_user_station CASCADE;
CREATE TABLE "track_user_station_apparatus" (
        "us_id" serial NOT NULL UNIQUE,
        "user_id" varchar NOT NULL,
        "station_id" varchar NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "track_user_station" ADD CONSTRAINT "track_user_station_fk0" FOREIGN KEY ("station_id") REFERENCES "stations"("station_id");
ALTER TABLE "track_user_station" ADD CONSTRAINT "track_user_station_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
