"use client";

import { FormEvent, useState } from "react";

import { auraConfig } from "@/config/aura";

const fieldClass =
  "w-full rounded-xl border border-[color-mix(in_srgb,#D4AF37_18%,transparent)] bg-[#05070B]/70 px-4 py-3 text-sm text-[#F3E8C8] outline-none transition-colors placeholder:text-[#94A3B8]/55 focus:border-[#D4AF37]";

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
    return (
      <div className="rounded-3xl border border-[color-mix(in_srgb,#D4AF37_28%,transparent)] bg-[#0B0F17]/80 p-8 text-center backdrop-blur-xl sm:p-10">
        <p className="text-xs tracking-[0.22em] text-[#D4AF37]">APPLICATION RECEIVED</p>
        <p className="mt-4 text-lg leading-relaxed text-[#F3E8C8]">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-3xl border border-[color-mix(in_srgb,#D4AF37_18%,transparent)] bg-[#0B0F17]/80 p-6 backdrop-blur-xl sm:p-8"
    >
      <label className="grid gap-2">
        <span className="text-sm text-[#F3E8C8]">
          姓名 / 常用昵称 <span className="text-[#D4AF37]">*</span>
        </span>
        <input
          required
          name="name"
          maxLength={40}
          autoComplete="name"
          className={fieldClass}
          placeholder="你希望我们怎么称呼你"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#F3E8C8]">
          微信号 / 手机号 <span className="text-[#D4AF37]">*</span>
        </span>
        <input
          required
          name="contact"
          maxLength={80}
          autoComplete="tel"
          className={fieldClass}
          placeholder="用于联系初审"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#F3E8C8]">
          个人小红书 / 微博 / 即刻 / 社交账号主页链接
        </span>
        <input
          name="social"
          maxLength={300}
          className={fieldClass}
          placeholder="选填，帮助我们提前了解你的审美风格"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#F3E8C8]">
          你目前从事的行业或个人背景 <span className="text-[#D4AF37]">*</span>
        </span>
        <textarea
          required
          name="background"
          maxLength={500}
          rows={3}
          className={fieldClass}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-[#F3E8C8]">
          在这 7 天中，你最渴望做出的产品或解决的核心痛点是什么？{" "}
          <span className="text-[#D4AF37]">*</span>
        </span>
        <textarea
          required
          name="intent"
          maxLength={1200}
          rows={5}
          className={fieldClass}
        />
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
        <p className="text-sm text-red-300">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 rounded-xl bg-[#D4AF37] px-5 py-3.5 text-sm font-medium text-[#05070B] transition-colors hover:bg-[#F3E8C8] disabled:opacity-60"
      >
        {status === "submitting" ? "提交中…" : auraConfig.form.submit}
      </button>
    </form>
  );
}
