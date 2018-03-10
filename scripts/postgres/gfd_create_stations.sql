DROP TABLE IF EXISTS stations CASCADE;
CREATE TABLE "stations" (
        "station_id" varchar NOT NULL UNIQUE,
        "station_name" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);

