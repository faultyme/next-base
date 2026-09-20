ALTER TABLE "audit_logs" ALTER COLUMN "action" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."audit_action";--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('USER_CREATED', 'OTP_SENT', 'OTP_RESEND', 'OTP_VERIFY_FAILED', 'OTP_VERIFY_SUCCESS', 'OTP_VERIFY_EXPIRED', 'OTP_VERIFY_COOLDOWN', 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT');--> statement-breakpoint
ALTER TABLE "audit_logs" ALTER COLUMN "action" SET DATA TYPE "public"."audit_action" USING "action"::"public"."audit_action";