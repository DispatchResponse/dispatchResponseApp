DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
        "user_id" serial NOT NULL UNIQUE,
        "first_name" varchar NOT NULL,
        "last_name" varchar NOT NULL,
        "mobile" varchar NOT NULL default '2035551212',
        "carrier" varchar NOT NULL,
        "tracking" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created_at" date NOT NULL,
        "updated_at" date NOT NULL
) WITH (
  OIDS=FALSE
);
