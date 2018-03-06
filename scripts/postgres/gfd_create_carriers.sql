DROP TABLE IF EXISTS carriers CASCADE;
CREATE TABLE "carriers" (
        "carrierId" serial NOT NULL UNIQUE,
        "carrierName" varchar NOT NULL,
        "gateway" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true
) WITH (
  OIDS=FALSE
);
