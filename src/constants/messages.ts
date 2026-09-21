// src/constants/messages.ts

export const EMAIL_MESSAGES = {
  OTP: {
    subject: "Your Verification Code",
    text: (vars: { otp: string; minutes: number }) =>
      `Your verification code is ${vars.otp}. ` +
      `It is valid for ${vars.minutes} minutes. ` +
      `If you didn't request this, ignore this email.`,
    html: (vars: { otp: string; minutes: number }) => `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2>Your Verification Code</h2>
        <p style="font-size:32px;font-weight:bold;letter-spacing:6px">
          ${vars.otp}
        </p>
        <p>This code is valid for <strong>${vars.minutes} minutes</strong>.</p>
        <p style="color:#666;font-size:12px">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  },
} as const;

export type EmailTemplate = keyof typeof EMAIL_MESSAGES;
