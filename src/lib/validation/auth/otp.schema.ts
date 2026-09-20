// src/lib/validation/auth/otp.schema.ts

import { z } from "zod";

const identifierSchema = z
  .object({
    email: z.string().email().optional(),
    mobile: z.string().min(10).optional(),
  })
  .refine(data => data.email || data.mobile, {
    message: "Either email or mobile is required",
  })
  .refine(data => !(data.email && data.mobile), {
    message: "Provide either email or mobile, not both",
  });

export const otpResendSchema = identifierSchema;

export const otpVerifySchema = identifierSchema.extend({
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type OtpResendInput = z.infer<typeof otpResendSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
