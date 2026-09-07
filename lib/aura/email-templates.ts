const GOLD = "#3F5C45";
const CHAMPAGNE = "#2A2723";
const SLATE = "#6B645C";
const INK = "#5A534C";
const BG = "#F4F0E8";
const SURFACE = "#FBFAF6";
const LINE = "#E4DFD4";

export type AuraApplicationMail = {
  name: string;
  email: string;
  contact: string;
  social: string;
  background: string;
  intent: string;
  submittedAt: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatShanghai(iso: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

function nl2br(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function maybeLink(value: string) {
  if (!value) return "未填写";
  if (/^https?:\/\//i.test(value)) {
    const safe = escapeHtml(value);
    return `<a href="${safe}" style="color:${GOLD};text-decoration:none;">${safe}</a>`;
  }
  return escapeHtml(value);
}

function preheader(text: string) {
  const pad = "&nbsp;&zwnj;".repeat(60);
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BG};">${escapeHtml(text)}${pad}</div>`;
}

function hairline() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr><td style="height:1px;line-height:1px;font-size:1px;background-color:${LINE};">&nbsp;</td></tr></table>`;
}

function wrapLetter(options: { preheader: string; inner: string }) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>AURA</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};">
${preheader(options.preheader)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG};border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:36px 16px 48px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:560px;border-collapse:collapse;background-color:${SURFACE};border:1px solid ${LINE};">
        <tr>
          <td style="height:3px;line-height:3px;font-size:3px;background-color:${GOLD};">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:40px 44px 20px;text-align:center;">
            <div style="font-family:Helvetica,Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;font-size:13px;letter-spacing:0.28em;color:${GOLD};">AURA</div>
            <div style="font-family:Helvetica,Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;font-size:13px;color:${SLATE};padding-top:8px;">住一周 · 412200.net</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 44px 8px;">${hairline()}</td>
        </tr>
        <tr>
          <td style="padding:28px 44px 36px;font-family:Helvetica,Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
            ${options.inner}
          </td>
        </tr>
        <tr>
          <td style="padding:0 44px 32px;">${hairline()}</td>
        </tr>
        <tr>
          <td style="padding:0 44px 40px;text-align:center;font-family:Helvetica,Arial,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;font-size:12px;line-height:20px;color:${SLATE};">
            大胡子出海搞钱<br />
            AURA 计划 · 住一周
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function processRow() {
  const steps = [
    { n: "1", label: "提交申请" },
    { n: "2", label: "看材料" },
    { n: "3", label: "聊十五分钟" },
    { n: "4", label: "发确认" },
  ];

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      ${steps
        .map(
          (step, index) => `<td width="25%" valign="top" style="padding:14px 6px;text-align:center;border:1px solid ${LINE};${index === 0 ? `background-color:#EFEBE3;` : ""}">
            <div style="font-size:10px;letter-spacing:0.18em;color:${GOLD};">${step.n}</div>
            <div style="font-size:12px;color:${index === 0 ? CHAMPAGNE : SLATE};padding-top:8px;">${step.label}</div>
          </td>`,
        )
        .join("")}
    </tr>
  </table>`;
}

function dossierRow(label: string, value: string) {
  return `<tr>
    <td style="padding:16px 0 6px;font-size:11px;letter-spacing:0.18em;color:${GOLD};">${escapeHtml(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 4px;font-size:15px;line-height:1.7;color:${CHAMPAGNE};">${value}</td>
  </tr>
  <tr>
    <td style="padding:12px 0 0;">${hairline()}</td>
  </tr>`;
}

export function applicantConfirmationMail(application: AuraApplicationMail) {
  const name = escapeHtml(application.name);
  const html = wrapLetter({
    preheader: "你的第一期席位申请已进入甄选。背景初审将在 24 小时内完成。",
    inner: `
      <h1 style="margin:0;font-size:26px;line-height:1.35;font-weight:500;color:${CHAMPAGNE};text-align:center;">申请收到了</h1>
      <p style="margin:28px 0 0;font-size:15px;line-height:1.85;color:${INK};">${name}，你好。</p>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.85;color:${INK};">
        申请我们已经看到。位子不会先收钱再补手续——通过之后才会发确认。
      </p>
      <p style="margin:16px 0 28px;font-size:15px;line-height:1.85;color:${INK};">
        一天内看材料。合适的话，微信约十五分钟。请保持微信能联系上。
      </p>
      ${processRow()}
      <p style="margin:28px 0 0;font-size:13px;line-height:1.7;color:${SLATE};text-align:center;">
        这封信只说明收到了，还不等于位子定了。
      </p>
    `,
  });

  const text = [
    "AURA 计划 · 申请收到了",
    "",
    `${application.name}，你好。`,
    "",
    "申请我们已经看到。一天内看材料，合适的话微信约十五分钟。",
    "",
    "接下来：交申请 → 看材料 → 聊十五分钟 → 发确认",
    "",
    "这封信只说明收到了，还不等于位子定了。",
    "",
    "大胡子出海搞钱",
    "AURA 计划 · 412200.net/aura",
  ].join("\n");

  return {
    subject: "AURA 计划｜申请收到了",
    html,
    text,
  };
}

export function internalApplicationMail(application: AuraApplicationMail) {
  const html = wrapLetter({
    preheader: `${application.name} 提交了第一期申请，请在 24 小时内完成背景初审。`,
    inner: `
      <h1 style="margin:0 0 8px;font-size:26px;line-height:1.35;font-weight:500;color:${CHAMPAGNE};text-align:center;">新申请</h1>
      <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:${SLATE};text-align:center;">
        第一期 · ${escapeHtml(formatShanghai(application.submittedAt))}
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${dossierRow("姓名 / 昵称", escapeHtml(application.name))}
        ${dossierRow("邮箱", `<a href="mailto:${escapeHtml(application.email)}" style="color:${GOLD};text-decoration:none;">${escapeHtml(application.email)}</a>`)}
        ${dossierRow("微信 / 手机", escapeHtml(application.contact))}
        ${dossierRow("社交主页", maybeLink(application.social))}
        ${dossierRow("行业与背景", nl2br(application.background))}
        ${dossierRow("产品意向 / 核心痛点", nl2br(application.intent))}
      </table>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:${SLATE};text-align:center;">
        请在 24 小时内完成背景初审，并预约 15 分钟 1v1 沟通。
      </p>
    `,
  });

  const text = [
    "AURA 计划 · 新申请待初审",
    `时间：${formatShanghai(application.submittedAt)}`,
    "",
    `姓名：${application.name}`,
    `邮箱：${application.email}`,
    `微信/手机：${application.contact}`,
    `社交主页：${application.social || "未填写"}`,
    "",
    "行业与背景：",
    application.background,
    "",
    "产品意向 / 核心痛点：",
    application.intent,
    "",
    "来源：https://412200.net/aura",
  ].join("\n");

  return {
    subject: `AURA 新申请｜${application.name}`,
    html,
    text,
  };
}
