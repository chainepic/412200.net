import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import {
  applicantConfirmationMail,
  internalApplicationMail,
  type AuraApplicationMail,
} from "@/lib/aura/email-templates";

function senderFrom() {
  return process.env.RESEND_FROM?.trim() || `AURA <aura@${siteConfig.domain}>`;
}

export async function sendAuraApplicationEmails(application: AuraApplicationMail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("缺少 RESEND_API_KEY");
  }

  const resend = new Resend(apiKey);
  const applicant = applicantConfirmationMail(application);
  const internal = internalApplicationMail(application);

  const from = senderFrom();
  const notifyTo = process.env.AURA_NOTIFY_EMAIL ?? siteConfig.contact.email;

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from,
      to: notifyTo,
      replyTo: application.email,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
    }),
    resend.emails.send({
      from,
      to: application.email,
      replyTo: notifyTo,
      subject: applicant.subject,
      html: applicant.html,
      text: applicant.text,
    }),
  ]);

  if (notifyResult.error) {
    throw new Error(notifyResult.error.message);
  }

  if (confirmResult.error) {
    throw new Error(confirmResult.error.message);
  }
}
