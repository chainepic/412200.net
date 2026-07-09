import { ReactNode } from "react";

import { Section } from "../../ui/section";

interface CoreServiceProps {
  title: string;
  description: string;
  icon: ReactNode;
  highlights: string[];
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
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-muted/15 hover:bg-muted/25 flex flex-col gap-5 rounded-2xl p-8 transition-colors"
            >
              <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-xl">
                {service.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {service.highlights.map((item) => (
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
          ))}
        </div>
      </div>
    </Section>
  );
}

export type { CoreServiceProps, CoreServicesProps };
