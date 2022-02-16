CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"dailyCalorie" int NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamptz,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."meals" (
	"mealId" serial NOT NULL,
	"userId" serial NOT NULL,
	"calories" int NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."exercises" (
	"exerciseId" serial NOT NULL,
	"calories" int NOT NULL,
	"userId" serial NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
