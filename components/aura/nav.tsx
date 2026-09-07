"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { auraConfig } from "@/config/aura";

const sectionLinks = [
  { href: "#deliverables", label: "核心跃迁" },
  { href: "#curriculum", label: "7 天路径" },
  { href: "#experience", label: "驻留体验" },
  { href: "#admissions", label: "甄选与费用" },
];

export function AuraNav() {
  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between gap-4 rounded-2xl border border-[color-mix(in_srgb,#D4AF37_18%,transparent)] bg-[#0B0F17]/72 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
          <Link href="/aura" className="min-w-0">
            <span className="block font-semibold tracking-[0.18em] text-[#F3E8C8]">
              {auraConfig.name}
            </span>
            <span className="text-[11px] tracking-[0.16em] text-[#94A3B8]">
              {auraConfig.byline}
            </span>
          </Link>

          <p className="hidden items-center gap-2 text-xs text-[#94A3B8] lg:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#D4AF37] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#D4AF37]" />
            </span>
            {auraConfig.cohort.label}
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#apply"
              className="hidden rounded-md bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#05070B] transition-colors hover:bg-[#F3E8C8] sm:inline-flex"
            >
              {auraConfig.navCta}
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F3E8C8] hover:bg-white/5 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">打开导航</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-[color-mix(in_srgb,#D4AF37_18%,transparent)] bg-[#05070B] text-[#F3E8C8]"
              >
                <SheetTitle className="sr-only">AURA 导航</SheetTitle>
                <div className="mt-8 grid gap-6">
                  <p className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <span className="size-2 rounded-full bg-[#D4AF37]" />
                    {auraConfig.cohort.label}
                  </p>
                  {sectionLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg text-[#F3E8C8]/90"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-4 py-3 text-sm font-medium text-[#05070B]"
                  >
                    {auraConfig.navCta}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
