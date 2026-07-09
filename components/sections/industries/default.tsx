import { ReactNode } from "react";

import { Reveal } from "../../ui/reveal";
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
      <div className="max-w-container mx-auto flex flex-col gap-12 sm:gap-16">
        <Reveal className="max-w-[640px]">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </Reveal>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.name} delay={0.06 * index}>
              <div className="bg-muted/15 hover:bg-muted/25 flex h-full flex-col gap-4 rounded-3xl p-6 transition-colors">
              <div className="text-brand">{industry.icon}</div>
              <h3 className="font-semibold">{industry.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {industry.description}
              </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export type { IndustryProps, IndustriesProps };
