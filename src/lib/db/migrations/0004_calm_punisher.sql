ALTER TABLE "verification_tokens" ADD COLUMN "resend_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD COLUMN "verification_attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD COLUMN "locked_until" timestamp with time zone;