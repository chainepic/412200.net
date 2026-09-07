"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { auraConfig } from "@/config/aura";

const sectionLinks = [
  { href: "#outcomes", label: "带走什么" },
  { href: "#stay", label: "住哪儿" },
  { href: "#days", label: "七天" },
  { href: "#apply", label: "申请" },
  { href: "#gallery", label: "现场" },
];

export function AuraNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={scrolled ? "aura-nav aura-nav-fixed" : "aura-nav"}>
      <div className="aura-container">
        <div className="aura-menu-par">
          <Link href="/aura" className="aura-logo aura-display">
            {auraConfig.logo}
          </Link>

          <div className={open ? "aura-nav-links is-open" : "aura-nav-links"}>
            {sectionLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="aura-nav-toggle"
            aria-expanded={open}
            aria-label={open ? "关闭导航" : "打开导航"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
