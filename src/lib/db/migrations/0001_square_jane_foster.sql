ALTER TABLE "users" RENAME TO "examples";--> statement-breakpoint
ALTER TABLE "examples" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "examples" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "examples" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "examples" DROP COLUMN "created_by";--> statement-breakpoint
ALTER TABLE "examples" DROP COLUMN "updated_by";--> statement-breakpoint
DROP TYPE "public"."role";