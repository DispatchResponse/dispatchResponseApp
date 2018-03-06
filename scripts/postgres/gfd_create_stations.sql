DROP TABLE IF EXISTS stations CASCADE;
CREATE TABLE "stations" (
        "stationId" varchar NOT NULL UNIQUE,
        "stationName" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true
) WITH (
  OIDS=FALSE
);

