import { NextResponse } from "next/server";

import { sendAuraApplicationEmails } from "@/lib/aura/mail";

const MAX_NAME = 40;
const MAX_EMAIL = 120;
const MAX_CONTACT = 80;
const MAX_SOCIAL = 300;
const MAX_BACKGROUND = 500;
const MAX_INTENT = 1200;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApplyBody = {
  name?: unknown;
  email?: unknown;
  contact?: unknown;
  social?: unknown;
  background?: unknown;
  intent?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: ApplyBody;

  try {
    body = (await request.json()) as ApplyBody;
  } catch {
    return NextResponse.json({ error: "无效的申请内容" }, { status: 400 });
  }

  if (asTrimmedString(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, MAX_NAME);
  const email = asTrimmedString(body.email, MAX_EMAIL).toLowerCase();
  const contact = asTrimmedString(body.contact, MAX_CONTACT);
  const social = asTrimmedString(body.social, MAX_SOCIAL);
  const background = asTrimmedString(body.background, MAX_BACKGROUND);
  const intent = asTrimmedString(body.intent, MAX_INTENT);

  if (
    name.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    contact.length < 5 ||
    background.length < 4 ||
    intent.length < 8
  ) {
    return NextResponse.json({ error: "请完整填写必填项后再提交" }, { status: 400 });
  }

  try {
    await sendAuraApplicationEmails({
      name,
      email,
      contact,
      social,
      background,
      intent,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AURA mail failed", error);
    return NextResponse.json(
      { error: "申请通道暂时不可用，请稍后重试或通过微信联系" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
