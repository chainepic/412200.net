"use client";

import { FormEvent, useState } from "react";

import { auraConfig } from "@/config/aura";

type Status = "idle" | "submitting" | "success" | "error";

export function AuraApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/aura/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          contact: data.get("contact"),
          social: data.get("social"),
          background: data.get("background"),
          intent: data.get("intent"),
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "提交失败，请稍后重试");
        return;
      }

      setStatus("success");
      setMessage(auraConfig.form.success);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("网络异常，请稍后重试");
    }
  }

  if (status === "success") {
    return <p className="aura-form-success">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="aura-form">
      <label>
        <span>姓名 / 常用昵称 *</span>
        <input
          required
          name="name"
          maxLength={40}
          autoComplete="name"
          placeholder="你希望我们怎么称呼你"
        />
      </label>

      <label>
        <span>邮箱 *</span>
        <input
          required
          type="email"
          name="email"
          maxLength={120}
          autoComplete="email"
          placeholder="用来收确认信"
        />
      </label>

      <label>
        <span>微信号 / 手机号 *</span>
        <input
          required
          name="contact"
          maxLength={80}
          autoComplete="tel"
          placeholder="方便我们约时间"
        />
      </label>

      <label>
        <span>小红书 / 微博 / 即刻，有就填</span>
        <input name="social" maxLength={300} />
      </label>

      <label>
        <span>你现在做什么 *</span>
        <textarea required name="background" maxLength={500} rows={3} />
      </label>

      <label>
        <span>这七天最想做完的一件事 *</span>
        <textarea required name="intent" maxLength={1200} rows={5} />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {status === "error" && message ? (
        <p className="aura-form-error">{message}</p>
      ) : null}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "提交中" : auraConfig.form.submit}
      </button>
    </form>
  );
}
