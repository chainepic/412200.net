"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

const navItems = [
  { title: "解决方案", href: "/#services" },
  { title: "服务价格", href: "/pricing" },
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
          className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
