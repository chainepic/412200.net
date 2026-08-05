import { CheckIcon } from "lucide-react";
import Image from "next/image";

import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

interface CaseDetail {
  title: string;
  description: string;
}

interface CaseScreenshot {
  src: string;
  title: string;
  description: string;
}

interface CaseStudyProps {
  title?: string;
  industry?: string;
  product?: string;
  description?: string;
  capabilities?: CaseDetail[];
  advantages?: CaseDetail[];
  screenshots?: CaseScreenshot[];
  tagline?: string;
  className?: string;
}

export default function CaseStudy({
  title = "客户成功案例",
  industry = "企业数字化",
  product = "",
  description = "",
  capabilities = [],
  advantages = [],
  screenshots = [],
  tagline = "",
  className,
}: CaseStudyProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col gap-12 sm:gap-16">
        <Reveal className="max-w-[800px]">
          <p className="text-brand mb-3 text-sm font-medium tracking-wide">
            {industry} · 产品案例
          </p>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {product && (
            <p className="text-foreground mt-3 text-lg font-medium">
              {product}
            </p>
          )}
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </Reveal>

        {screenshots.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {screenshots.map((screenshot, index) => (
              <Reveal key={screenshot.src} delay={0.04 * index}>
                <figure className="bg-muted/15 overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={screenshot.src}
                      alt={`${product || title} · ${screenshot.title}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 hover:scale-[1.01]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="p-4 sm:p-5">
                    <h3 className="font-medium">{screenshot.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {screenshot.description}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <Reveal>
            <div className="bg-muted/15 rounded-3xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                这套系统能做什么
              </h3>
              <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <div key={capability.title}>
                    <h4 className="font-medium">{capability.title}</h4>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-brand/15 bg-brand/5 flex h-full flex-col rounded-3xl border p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                主要优点
              </h3>
              <ul className="mt-7 flex flex-col gap-5">
                {advantages.map((advantage) => (
                  <li key={advantage.title} className="flex gap-3">
                    <span className="bg-brand/10 text-brand mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full">
                      <CheckIcon className="size-3.5" />
                    </span>
                    <div>
                      <h4 className="font-medium">{advantage.title}</h4>
                      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {tagline && (
                <blockquote className="border-brand/30 text-foreground mt-8 border-l-2 pl-4 text-sm leading-relaxed font-medium">
                  {tagline}
                </blockquote>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export type { CaseStudyProps };
