import { NextResponse } from "next/server";

import { sendAuraPartnerEmails } from "@/lib/aura/mail";

const MAX_STAY = 80;
const MAX_NAME = 40;
const MAX_EMAIL = 120;
const MAX_CONTACT = 80;
const MAX_CITY = 80;
const MAX_INTRO = 1200;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PartnerBody = {
  stayName?: unknown;
  contactName?: unknown;
  email?: unknown;
  contact?: unknown;
  city?: unknown;
  intro?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: PartnerBody;

  try {
    body = (await request.json()) as PartnerBody;
  } catch {
    return NextResponse.json({ error: "无效的申请内容" }, { status: 400 });
  }

  if (asTrimmedString(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const stayName = asTrimmedString(body.stayName, MAX_STAY);
  const contactName = asTrimmedString(body.contactName, MAX_NAME);
  const email = asTrimmedString(body.email, MAX_EMAIL).toLowerCase();
  const contact = asTrimmedString(body.contact, MAX_CONTACT);
  const city = asTrimmedString(body.city, MAX_CITY);
  const intro = asTrimmedString(body.intro, MAX_INTRO);

  if (
    stayName.length < 2 ||
    contactName.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    contact.length < 5 ||
    intro.length < 8
  ) {
    return NextResponse.json({ error: "请完整填写必填项后再提交" }, { status: 400 });
  }

  try {
    await sendAuraPartnerEmails({
      stayName,
      contactName,
      email,
      contact,
      city,
      intro,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AURA partner mail failed", error);
    return NextResponse.json(
      { error: "通道暂时不可用，请稍后重试" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
