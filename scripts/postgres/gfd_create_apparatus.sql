DROP TABLE IF EXISTS apparatus CASCADE;
CREATE TABLE "apparatus" (
        "apparatus_id" varchar NOT NULL UNIQUE,
        "apparatus_name" varchar NOT NULL,
        "enabled" boolean NOT NULL DEFAULT true,
        "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);

