CREATE TABLE "examples" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "verification_tokens" RENAME COLUMN "locked_until" TO "resend_locked_until";--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD COLUMN "verification_locked_until" timestamp with time zone;