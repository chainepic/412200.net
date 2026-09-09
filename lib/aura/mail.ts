import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import {
  applicantConfirmationMail,
  internalApplicationMail,
  internalPartnerMail,
  partnerConfirmationMail,
  type AuraApplicationMail,
  type AuraPartnerMail,
} from "@/lib/aura/email-templates";

function senderFrom() {
  return process.env.RESEND_FROM?.trim() || `AURA <aura@${siteConfig.domain}>`;
}

function notifyInbox() {
  return process.env.AURA_NOTIFY_EMAIL?.trim() || "jeioccessful@gmail.com";
}

async function sendPair(options: {
  notify: { subject: string; html: string; text: string };
  confirm: { subject: string; html: string; text: string };
  replyToApplicant: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("缺少 RESEND_API_KEY");
  }

  const resend = new Resend(apiKey);
  const from = senderFrom();
  const notifyTo = notifyInbox();

  const [notifyResult, confirmResult] = await Promise.all([
    resend.emails.send({
      from,
      to: notifyTo,
      replyTo: options.replyToApplicant,
      subject: options.notify.subject,
      html: options.notify.html,
      text: options.notify.text,
    }),
    resend.emails.send({
      from,
      to: options.replyToApplicant,
      subject: options.confirm.subject,
      html: options.confirm.html,
      text: options.confirm.text,
    }),
  ]);

  if (notifyResult.error) {
    throw new Error(notifyResult.error.message);
  }

  if (confirmResult.error) {
    throw new Error(confirmResult.error.message);
  }
}

export async function sendAuraApplicationEmails(application: AuraApplicationMail) {
  const applicant = applicantConfirmationMail(application);
  const internal = internalApplicationMail(application);

  await sendPair({
    notify: internal,
    confirm: applicant,
    replyToApplicant: application.email,
  });
}

export async function sendAuraPartnerEmails(application: AuraPartnerMail) {
  const applicant = partnerConfirmationMail(application);
  const internal = internalPartnerMail(application);

  await sendPair({
    notify: internal,
    confirm: applicant,
    replyToApplicant: application.email,
  });
}
