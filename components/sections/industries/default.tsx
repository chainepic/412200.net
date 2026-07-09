import { ReactNode } from "react";

import { Section } from "../../ui/section";

interface IndustryProps {
  name: string;
  description: string;
  icon: ReactNode;
}

interface IndustriesProps {
  title?: string;
  description?: string;
  industries?: IndustryProps[];
  className?: string;
}

export default function Industries({
  title = "行业解决方案",
  description = "深耕金融、医疗、制造、电商等行业，提供可落地的智能化方案。",
  industries = [],
  className,
}: IndustriesProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-16">
        <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-md max-w-[600px] font-medium sm:text-xl">
            {description}
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="border-border/60 bg-card/40 hover:border-brand/40 flex flex-col gap-4 rounded-xl border p-6 transition-colors"
            >
              <div className="text-brand">{industry.icon}</div>
              <h3 className="font-semibold">{industry.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export type { IndustryProps, IndustriesProps };
