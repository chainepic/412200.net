import { NextResponse } from "next/server";

const MAX_NAME = 40;
const MAX_CONTACT = 80;
const MAX_SOCIAL = 300;
const MAX_BACKGROUND = 500;
const MAX_INTENT = 1200;

type ApplyBody = {
  name?: unknown;
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

function isFeishuWebhook(url: string) {
  return url.includes("feishu.cn") || url.includes("larksuite.com");
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
  const contact = asTrimmedString(body.contact, MAX_CONTACT);
  const social = asTrimmedString(body.social, MAX_SOCIAL);
  const background = asTrimmedString(body.background, MAX_BACKGROUND);
  const intent = asTrimmedString(body.intent, MAX_INTENT);

  if (name.length < 2 || contact.length < 5 || background.length < 4 || intent.length < 8) {
    return NextResponse.json({ error: "请完整填写必填项后再提交" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const payload = {
    name,
    contact,
    social,
    background,
    intent,
    submittedAt,
    source: "https://412200.net/aura",
  };

  const webhookUrl = process.env.AURA_WEBHOOK_URL;

  if (webhookUrl) {
    const webhookBody = isFeishuWebhook(webhookUrl)
      ? {
          msg_type: "text",
          content: {
            text: [
              "AURA 计划新申请",
              `姓名：${name}`,
              `微信/手机：${contact}`,
              `社交主页：${social || "未填"}`,
              `行业背景：${background}`,
              `产品意向：${intent}`,
              `提交时间：${submittedAt}`,
            ].join("\n"),
          },
        }
      : payload;

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookBody),
    });

    if (!webhookResponse.ok) {
      console.error("AURA webhook failed", webhookResponse.status);
      return NextResponse.json(
        { error: "申请通道暂时不可用，请稍后重试或通过微信联系" },
        { status: 502 },
      );
    }
  } else {
    console.info("AURA application (no AURA_WEBHOOK_URL)", payload);
  }

  return NextResponse.json({ ok: true });
}
