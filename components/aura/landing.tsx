import {
  ApertureIcon,
  BoxIcon,
  CpuIcon,
  HomeIcon,
  KeyRoundIcon,
  MonitorIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { AuraApplicationForm } from "@/components/aura/application-form";
import { AuraNav } from "@/components/aura/nav";
import { Reveal } from "@/components/ui/reveal";
import { auraConfig } from "@/config/aura";

const deliverableIcons = [BoxIcon, CpuIcon, ApertureIcon, UsersIcon];
const experienceIcons = [HomeIcon, MonitorIcon, KeyRoundIcon];

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs tracking-[0.28em] text-[#D4AF37]">{kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F3E8C8] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function AuraLanding() {
  return (
    <div className="aura-page relative min-h-screen overflow-x-hidden bg-[#05070B] text-[#F3E8C8]">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#05070B]" />
        <div className="absolute top-[-12rem] left-1/2 h-[34rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/12 blur-[140px]" />
        <div className="absolute top-[38%] right-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#D4AF37]/8 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <AuraNav />

      <section className="px-4 pb-20 pt-10 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.32em] text-[#D4AF37] sm:text-sm">
              {auraConfig.hero.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {auraConfig.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              {auraConfig.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="#apply"
                className="rounded-xl bg-[#D4AF37] px-7 py-3.5 text-sm font-medium text-[#05070B] transition-colors hover:bg-[#F3E8C8]"
              >
                {auraConfig.hero.cta}
              </a>
              <p className="text-sm text-[#94A3B8]">{auraConfig.hero.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="deliverables" className="scroll-mt-28 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading kicker="CORE DELIVERABLES" title="四项核心跃迁" />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {auraConfig.deliverables.map((item, index) => {
              const Icon = deliverableIcons[index];
              return (
                <Reveal key={item.index} delay={index * 0.05}>
                  <article className="h-full rounded-3xl border border-[color-mix(in_srgb,#D4AF37_16%,transparent)] bg-[#0B0F17]/80 p-7 backdrop-blur-xl sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs tracking-[0.24em] text-[#D4AF37]">
                        卡片 {item.index} / {item.kicker}
                      </span>
                      <Icon className="size-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#94A3B8]">{item.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-28 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionHeading
              kicker="CURRICULUM & IMMERSION"
              title="7 天进阶路径"
            />
          </Reveal>
          <ol className="relative mt-14 space-y-0 before:absolute before:top-2 before:bottom-2 before:left-[0.7rem] before:w-px before:bg-[color-mix(in_srgb,#D4AF37_28%,transparent)] sm:before:left-[1.05rem]">
            {auraConfig.days.map((item, index) => (
              <li key={item.day} className="relative pl-10 sm:pl-14">
                <div className="absolute top-1.5 left-0 flex size-6 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#05070B] sm:size-8">
                  <span className="size-1.5 rounded-full bg-[#D4AF37] sm:size-2" />
                </div>
                <Reveal delay={index * 0.03}>
                  <div className="pb-10">
                    <p className="text-xs tracking-[0.22em] text-[#D4AF37]">
                      {item.day}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-[#94A3B8]">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="experience" className="scroll-mt-28 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              kicker="RESIDENCY EXPERIENCE"
              title="空间体验与服务保障"
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {auraConfig.experience.map((item, index) => {
              const Icon = experienceIcons[index];
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-3xl border border-[color-mix(in_srgb,#D4AF37_16%,transparent)] bg-[#0B0F17]/80 p-7 backdrop-blur-xl">
                    <Icon className="size-5 text-[#D4AF37]" />
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-[#94A3B8]">{item.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="admissions" className="scroll-mt-28 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              kicker="PRICING & ADMISSIONS"
              title="甄选机制与费用"
              description={`单期名额：${auraConfig.pricing.seats}`}
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="rounded-3xl border border-[#D4AF37]/45 bg-[#0B0F17]/90 p-8 backdrop-blur-xl">
                <p className="text-xs tracking-[0.22em] text-[#D4AF37]">
                  {auraConfig.pricing.earlyBird.label}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight">
                  {auraConfig.pricing.earlyBird.price}
                </p>
                <p className="mt-2 text-sm text-[#94A3B8]">
                  {auraConfig.pricing.earlyBird.note}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.05}>
              <article className="rounded-3xl border border-[color-mix(in_srgb,#D4AF37_16%,transparent)] bg-[#0B0F17]/80 p-8 backdrop-blur-xl">
                <p className="text-xs tracking-[0.22em] text-[#94A3B8]">
                  {auraConfig.pricing.standard.label}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight">
                  {auraConfig.pricing.standard.price}
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <div className="mt-6 rounded-3xl border border-[color-mix(in_srgb,#D4AF37_16%,transparent)] bg-[#0B0F17]/70 p-7 backdrop-blur-xl">
              <p className="text-sm font-medium text-[#F3E8C8]">费用包含</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {auraConfig.pricing.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <p className="text-center text-sm tracking-[0.18em] text-[#D4AF37]">
                录取流程
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-4">
                {auraConfig.pricing.process.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-2xl border border-[color-mix(in_srgb,#D4AF37_16%,transparent)] bg-[#0B0F17]/80 px-4 py-5 text-center"
                  >
                    <span className="text-xs text-[#D4AF37]">0{index + 1}</span>
                    <p className="mt-2 text-sm text-[#F3E8C8]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="apply" className="scroll-mt-28 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <SectionHeading
              kicker="APPLICATION"
              title="申请第一期席位"
              description="提交问卷后，我们将在 24 小时内完成背景初审。通过甄选者将收到正式录取邀请函，席位以邀请函锁定为准。"
            />
          </Reveal>
          <div className="mt-10">
            <AuraApplicationForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-[color-mix(in_srgb,#D4AF37_14%,transparent)] px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-[#94A3B8] sm:flex-row sm:text-left">
          <p>
            {auraConfig.name} · {auraConfig.organizer}
          </p>
          <Link href="/" className="text-[#F3E8C8]/80 underline-offset-4 hover:underline">
            412200.net
          </Link>
        </div>
      </footer>
    </div>
  );
}
