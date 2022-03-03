CREATE TABLE "public"."users" (
	"userId" serial,
	"userName" text NOT NULL,
	"dailyCalorie" int NOT NULL,
	"hashedPassword" TEXT NOT NULL,
  "createdAt" timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("userName")
);



CREATE TABLE "public"."meals" (
	"mealId" serial NOT NULL,
	"userId" int NOT NULL REFERENCES "users"("userId"),
	"calories" int NOT NULL,
  "mealName" text NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exercises" (
	"exerciseId" serial NOT NULL,
  "userId" int NOT NULL REFERENCES "users"("userId"),
	"calories" int NOT NULL,
  "exerciseName" text NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);
