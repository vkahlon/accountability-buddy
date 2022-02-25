CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" text NOT NULL,
	"dailyCalorie" int NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."meals" (
	"mealId" serial NOT NULL,
	"calories" int NOT NULL,
  "mealName" text NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exercises" (
	"exerciseId" serial NOT NULL,
	"calories" int NOT NULL,
  "exerciseName" text NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);
