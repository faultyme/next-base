// src/app/api/auth/otp/resend/route.ts

import { NextResponse } from "next/server";

import { findUser } from "@/lib/db/queries/user/find-user";
import { sendVerificationOtp } from "@/services/auth/otp";
import { otpResendSchema } from "@/lib/validation/auth/otp.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = otpResendSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const input = result.data;

    const user = input.email
      ? await findUser({
          type: "email",
          value: input.email,
        })
      : await findUser({
          type: "mobile",
          value: input.mobile!,
        });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error: "User is not active",
        },
        { status: 400 }
      );
    }

    const identifierType = input.email ? "EMAIL" : "MOBILE";

    const identifier = input.email ?? input.mobile!;

    const otpResult = await sendVerificationOtp({
      userId: user.id,
      identifierType,
      identifier,
    });

    // Resend cooldown is active.
    // No new OTP was sent.
    if (!otpResult.sent) {
      return NextResponse.json(
        {
          success: true,
          data: {
            verificationRequired: true,
            identifierType,
            sent: false,
            expiresAt: otpResult.expiresAt,
            resendLockedUntil: otpResult.resendLockedUntil,
            resendCount: otpResult.resendCount,
          },
          message: "OTP resend cooldown is active.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          verificationRequired: true,
          identifierType,
          sent: true,
          expiresAt: otpResult.expiresAt,
          resendLockedUntil: otpResult.resendLockedUntil,
          resendCount: otpResult.resendCount,
        },
        message: "OTP sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 OTP API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
