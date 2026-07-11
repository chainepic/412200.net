import { ReactNode } from "react";

import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

interface CoreServiceProps {
  title: string;
  description: string;
  icon: ReactNode;
  highlights: string[];
  featured?: boolean;
  titleHref?: string;
}

interface CoreServicesProps {
  title?: string;
  description?: string;
  services?: CoreServiceProps[];
  className?: string;
}

export default function CoreServices({
  title = "三大核心 AI 服务",
  description = "面向企业的智能化刚需场景，从接入、学习到落地，提供完整解决方案。",
  services = [],
  className,
}: CoreServicesProps) {
  const [first, ...rest] = services;

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

        {first && (
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            <Reveal className="lg:col-span-7">
              <div className="bg-muted/20 flex h-full flex-col gap-6 rounded-3xl p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="text-brand shrink-0">{first.icon}</span>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {first.titleHref ? (
                      <a
                        href={first.titleHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand transition-colors"
                      >
                        {first.title}
                      </a>
                    ) : (
                      first.title
                    )}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-[52ch] leading-relaxed">
                  {first.description}
                </p>
                <ul className="mt-auto flex flex-col gap-2">
                  {first.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="grid gap-4 lg:col-span-5">
              {rest.map((service, index) => (
                <Reveal key={service.title} delay={0.08 * (index + 1)}>
                  <div className="bg-muted/15 hover:bg-muted/25 flex h-full flex-col gap-4 rounded-3xl p-6 transition-colors sm:p-7">
                    <div className="flex items-center gap-2.5">
                      <span className="text-brand shrink-0">
                        {service.icon}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {service.highlights.slice(0, 2).map((item) => (
                        <li
                          key={item}
                          className="text-muted-foreground text-xs"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

export type { CoreServiceProps, CoreServicesProps };
