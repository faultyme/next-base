// src/services/messaging/mail/send-mail.ts

import { transporter } from "@/lib/messaging/mail/transporter";
import { EMAIL_MESSAGES } from "@/constants/messages";
import type { EmailTemplate } from "@/constants/messages";

type SendMailArgs = {
  to: string | string[];
  template: EmailTemplate;
  vars?: unknown;
};

export async function sendMail({ to, template, vars }: SendMailArgs) {
  const tpl = EMAIL_MESSAGES[template];

  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: tpl.subject,
    text: typeof tpl.text === "function" ? tpl.text(vars as never) : tpl.text,
    html: typeof tpl.html === "function" ? tpl.html(vars as never) : tpl.html,
  });
}
