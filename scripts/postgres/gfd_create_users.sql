DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
        "userId" serial NOT NULL UNIQUE,
        "firstName" varchar NOT NULL,
        "lastName" varchar NOT NULL,
        "mobile" varchar NOT NULL default '2035551212',
        "carrier" varchar NOT NULL,
        "tracking" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "createdAt" date NOT NULL,
        "updatedAt" date NOT NULL
) WITH (
  OIDS=FALSE
);
