"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

const navItems = [
  { title: "解决方案", href: "/#services" },
  { title: "文章", href: "/articles" },
  { title: "品牌与案例", href: "/#brand" },
  { title: "服务价格", href: "/pricing" },
  { title: "釉下五彩瓷", href: "https://youxiawucaici.com" },
  { title: "成功案例", href: "/#cases" },
  { title: "关于我们", href: "/#about" },
  { title: "联系我们", href: "/#contact" },
];

export default function CompanyNav({ className }: { className?: string }) {
  return (
    <nav className={cn("hidden items-center gap-6 md:flex", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
