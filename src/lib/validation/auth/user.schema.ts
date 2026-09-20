// src/lib/validation/auth/user.schema.ts

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

export const userRegisterSchema = identifierSchema;

export const userLoginSchema = identifierSchema.extend({
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
