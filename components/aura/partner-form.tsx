"use client";

import { FormEvent, useState } from "react";

import { auraConfig } from "@/config/aura";

type Status = "idle" | "submitting" | "success" | "error";

export function AuraPartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/aura/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stayName: data.get("stayName"),
          contactName: data.get("contactName"),
          email: data.get("email"),
          contact: data.get("contact"),
          city: data.get("city"),
          intro: data.get("intro"),
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
      setMessage(auraConfig.partner.success);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("网络异常，请稍后重试");
    }
  }

  if (status === "success") {
    return <p className="aura-form-success is-light">{message}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="aura-form is-light">
      <label>
        <span>民宿名称 *</span>
        <input required name="stayName" maxLength={80} placeholder="店名" />
      </label>

      <label>
        <span>联系人 *</span>
        <input required name="contactName" maxLength={40} autoComplete="name" />
      </label>

      <label>
        <span>邮箱 *</span>
        <input
          required
          type="email"
          name="email"
          maxLength={120}
          autoComplete="email"
          placeholder="方便我们回信"
        />
      </label>

      <label>
        <span>微信号 / 手机号 *</span>
        <input required name="contact" maxLength={80} autoComplete="tel" />
      </label>

      <label>
        <span>所在城市 / 地址</span>
        <input name="city" maxLength={80} />
      </label>

      <label>
        <span>民宿简介与合作意向 *</span>
        <textarea required name="intro" maxLength={1200} rows={5} />
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
        <p className="aura-form-error is-light">{message}</p>
      ) : null}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "提交中" : auraConfig.partner.submit}
      </button>
    </form>
  );
}
