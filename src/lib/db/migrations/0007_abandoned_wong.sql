ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_SENT';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_RESEND';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_VERIFY_FAILED';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_VERIFY_SUCCESS';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_VERIFY_EXPIRED';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'OTP_VERIFY_COOLDOWN';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'LOGIN_SUCCESS';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'LOGIN_FAILED';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'LOGOUT';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'TOKEN_REFRESH';--> statement-breakpoint
ALTER TYPE "public"."audit_action" ADD VALUE 'TOKEN_REVOKED';