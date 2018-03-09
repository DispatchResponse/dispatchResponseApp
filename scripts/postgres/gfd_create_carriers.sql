DROP TABLE IF EXISTS carriers CASCADE;
CREATE TABLE "carriers" (
        "carrier_id" serial NOT NULL UNIQUE,
        "carrier_name" varchar NOT NULL,
        "gateway" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);
