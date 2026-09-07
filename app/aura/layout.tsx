import { auraMontserrat, auraRaleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./aura.css";

export default function AuraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        auraRaleway.variable,
        auraMontserrat.variable,
        "aura-fonts",
      )}
    >
      {children}
    </div>
  );
}
