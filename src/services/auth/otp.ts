// src/services/auth/otp.ts

import { createHmac, randomInt } from "crypto";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schemas/audit.schema";
import { verificationTokens, users } from "@/lib/db/schemas/user.schema";
import { sendMail } from "../messaging/mail/send-mail";

type IdentifierType = "EMAIL" | "MOBILE";

type SendVerificationOtpInput = {
  userId: string;
  identifierType: IdentifierType;
  identifier: string;
};

type SendVerificationOtpResult = {
  sent: boolean;
  expiresAt: Date;
  resendLockedUntil: Date | null;
  resendCount: number;
};

type VerifyOtpInput = {
  userId: string;
  identifierType: IdentifierType;
  otp: string;
};

type VerifyOtpResult =
  | { verified: true; verifiedAt: Date; verificationAttempts: number }
  | { verified: false; reason: "NOT_FOUND" | "EXPIRED" }
  | {
      verified: false;
      reason: "COOLDOWN" | "INVALID";
      verificationLockedUntil: Date;
      verificationAttempts: number;
    };

function generateOtp(): string {
  return randomInt(100000, 1000000).toString();
}

function hashOtp(otp: string): string {
  const secret = process.env.OTP_HASH_SECRET;
  if (!secret) throw new Error("OTP_HASH_SECRET is not configured");
  return createHmac("sha256", secret).update(otp).digest("hex");
}

function getCooldownSeconds(attempt: number): number {
  return 30 * 2 ** (attempt - 1);
}

/**
 * SEND / RESEND OTP
 */
export async function sendVerificationOtp({
  userId,
  identifierType,
  identifier,
}: SendVerificationOtpInput): Promise<SendVerificationOtpResult> {
  const now = new Date();

  const [existingToken] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.userId, userId),
        eq(verificationTokens.identifierType, identifierType)
      )
    )
    .limit(1);

  if (existingToken?.resendLockedUntil && existingToken.resendLockedUntil > now) {
    return {
      sent: false,
      expiresAt: existingToken.expiresAt,
      resendLockedUntil: existingToken.resendLockedUntil,
      resendCount: existingToken.resendCount,
    };
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

  if (!existingToken) {
    await db.transaction(async tx => {
      await tx.insert(verificationTokens).values({
        userId,
        identifierType,
        tokenHash: otpHash,
        expiresAt,
        resendCount: 0,
        verificationAttempts: 0,
        resendLockedUntil: null,
        verificationLockedUntil: null,
      });

      await tx.insert(auditLogs).values({
        actorUserId: userId,
        action: "OTP_SENT",
        entityType: "USER",
        entityId: userId,
        previousValue: null,
        currentValue: { identifierType, expiresAt },
      });
    });

    await sendMail({
      to: identifier,
      template: "OTP",
      vars: { otp, minutes: Math.round((expiresAt.getTime() - now.getTime()) / 60_000) },
    });

    if (process.env.NODE_ENV === "development") console.log(`[OTP] ${identifier}: ${otp}`);

    return { sent: true, expiresAt, resendLockedUntil: null, resendCount: 0 };
  }

  const nextResendCount = existingToken.resendCount + 1;
  const cooldownSeconds = getCooldownSeconds(nextResendCount);
  const resendLockedUntil = new Date(now.getTime() + cooldownSeconds * 1000);

  await db.transaction(async tx => {
    await tx
      .update(verificationTokens)
      .set({ tokenHash: otpHash, expiresAt, resendCount: nextResendCount, resendLockedUntil })
      .where(eq(verificationTokens.id, existingToken.id));

    await tx.insert(auditLogs).values({
      actorUserId: userId,
      action: "OTP_RESEND",
      entityType: "USER",
      entityId: userId,
      previousValue: { resendCount: existingToken.resendCount },
      currentValue: {
        identifierType,
        resendCount: nextResendCount,
        cooldownSeconds,
        resendLockedUntil,
        expiresAt,
      },
    });
  });

  await sendMail({
    to: identifier,
    template: "OTP",
    vars: { otp, minutes: Math.round((expiresAt.getTime() - now.getTime()) / 60_000) },
  });

  if (process.env.NODE_ENV === "development") console.log(`[OTP] ${identifier}: ${otp}`);

  return { sent: true, expiresAt, resendLockedUntil, resendCount: nextResendCount };
}

/**
 * VERIFY OTP
 */
export async function verifyOtp({
  userId,
  identifierType,
  otp,
}: VerifyOtpInput): Promise<VerifyOtpResult> {
  const now = new Date();

  const [verificationToken] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.userId, userId),
        eq(verificationTokens.identifierType, identifierType)
      )
    )
    .limit(1);

  if (!verificationToken) return { verified: false, reason: "NOT_FOUND" };

  if (
    verificationToken.verificationLockedUntil &&
    verificationToken.verificationLockedUntil > now
  ) {
    return {
      verified: false,
      reason: "COOLDOWN",
      verificationLockedUntil: verificationToken.verificationLockedUntil,
      verificationAttempts: verificationToken.verificationAttempts,
    };
  }

  if (verificationToken.expiresAt <= now) return { verified: false, reason: "EXPIRED" };

  const otpHash = hashOtp(otp);

  if (otpHash !== verificationToken.tokenHash) {
    const nextAttempts = verificationToken.verificationAttempts + 1;
    const cooldownSeconds = getCooldownSeconds(nextAttempts);
    const verificationLockedUntil = new Date(now.getTime() + cooldownSeconds * 1000);

    await db.transaction(async tx => {
      await tx
        .update(verificationTokens)
        .set({ verificationAttempts: nextAttempts, verificationLockedUntil })
        .where(eq(verificationTokens.id, verificationToken.id));

      await tx.insert(auditLogs).values({
        actorUserId: userId,
        action: "OTP_VERIFY_FAILED",
        entityType: "USER",
        entityId: userId,
        previousValue: { verificationAttempts: verificationToken.verificationAttempts },
        currentValue: {
          identifierType,
          reason: "INVALID_OTP",
          attempt: nextAttempts,
          cooldownSeconds,
          verificationLockedUntil,
        },
      });
    });

    return {
      verified: false,
      reason: "INVALID",
      verificationLockedUntil,
      verificationAttempts: nextAttempts,
    };
  }

  const verifiedAt = new Date();
  const verificationAttempts = verificationToken.verificationAttempts + 1;

  await db.transaction(async tx => {
    await tx
      .update(users)
      .set(
        identifierType === "EMAIL" ? { emailVerified: verifiedAt } : { mobileVerified: verifiedAt }
      )
      .where(eq(users.id, userId));

    await tx.delete(verificationTokens).where(eq(verificationTokens.id, verificationToken.id));

    await tx.insert(auditLogs).values({
      actorUserId: userId,
      action: "OTP_VERIFY_SUCCESS",
      entityType: "USER",
      entityId: userId,
      previousValue: { identifierType },
      currentValue: { identifierType, attempt: verificationAttempts, verifiedAt },
    });
  });

  return { verified: true, verifiedAt, verificationAttempts };
}
