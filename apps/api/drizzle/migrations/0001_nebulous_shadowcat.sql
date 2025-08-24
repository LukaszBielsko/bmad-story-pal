CREATE TABLE "test" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "test_email_unique" UNIQUE("email")
);
