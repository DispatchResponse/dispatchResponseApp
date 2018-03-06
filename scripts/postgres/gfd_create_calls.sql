DROP TABLE IF EXISTS calls CASCADE;
CREATE TABLE "calls" (
        "callId" serial NOT NULL UNIQUE,
        "assignment" varchar NOT NULL, -- first element is radio channel, all that follows are apparatus
        "radio_freq" varchar NOT NULL,
        "apt_no" varchar NOT NULL,
        "call_category" varchar NOT NULL,
        "call_description" varchar NOT NULL,
        "call_type" varchar NOT NULL,
        "cfs_no" varchar NOT NULL,
        "cfs_remark" varchar NOT NULL,
        "city" varchar NOT NULL,
        "dispatch_fire" varchar NOT NULL,
        "latitude" varchar NOT NULL,
        "location" varchar NOT NULL,
        "longitude" varchar NOT NULL,
        "premise_name" varchar NOT NULL,
        "priority_amb" varchar NOT NULL,
        "priority_fire" varchar NOT NULL,
        "priority_pol" varchar NOT NULL,
        "timeout" varchar NOT NULL,
        "cross_street" varchar NOT NULL,
        "map_ref" varchar NOT NULL,
        "zip" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "test_call" boolean NOT NULL DEFAULT false,
        "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);
