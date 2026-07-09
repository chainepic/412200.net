import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import { Badge } from "../../ui/badge";
import Glow from "../../ui/glow";
import { LinkButton, type LinkButtonProps } from "../../ui/link-button";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Reveal } from "../../ui/reveal";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: ReactNode | false;
  badge?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

const DEFAULT_HERO_BUTTONS: HeroButtonProps[] = [
  {
    href: siteConfig.getStartedUrl,
    text: "Get Started",
    variant: "default",
  },
  {
    href: siteConfig.links.website,
    text: "GitHub",
    variant: "glow",
    icon: <Github className="mr-2 size-4" />,
  },
];

const DEFAULT_HERO_BADGE = (
  <Badge variant="outline" className="animate-appear">
    <span className="text-muted-foreground">
      New version of Launch UI is out!
    </span>
    <a href={siteConfig.getStartedUrl} className="flex items-center gap-1">
      Get started
      <ArrowRightIcon className="size-3" />
    </a>
  </Badge>
);

const DEFAULT_HERO_MOCKUP = (
  <Screenshot
    srcLight="/dashboard-light.png"
    srcDark="/dashboard-dark.png"
    alt="Launch UI app screenshot"
    width={1248}
    height={765}
    loading="eager"
    className="w-full"
  />
);

function HeroVisual() {
  return (
    <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[360px]">
      <div className="from-brand/15 via-brand/5 absolute inset-0 rounded-3xl bg-linear-to-br to-transparent" />
      <div className="relative grid w-full max-w-md grid-cols-2 gap-3 p-6">
        {[
          { label: "API 中转", value: "按量" },
          { label: "AI 培训", value: "¥8k/天" },
          { label: "Agent", value: "私有化" },
          { label: "交付", value: "全国" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-background/60 rounded-2xl p-4 backdrop-blur-sm"
          >
            <div className="text-muted-foreground text-xs">{item.label}</div>
            <div className="mt-1 text-lg font-semibold tracking-tight">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero({
  title = "Give your big idea the design it deserves",
  description = "Professionally designed blocks and templates built with React, Shadcn/ui and Tailwind that will help your product stand out.",
  mockup = DEFAULT_HERO_MOCKUP,
  badge = DEFAULT_HERO_BADGE,
  buttons = DEFAULT_HERO_BUTTONS,
  className,
}: HeroProps) {
  const isSplit = mockup === false;

  return (
    <Section
      className={cn(
        isSplit
          ? "min-h-[calc(100dvh-4rem)] pb-16 pt-8 sm:pb-20 sm:pt-12"
          : "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="max-w-container mx-auto">
        {isSplit ? (
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6 text-left sm:gap-8">
              {badge !== false && <Reveal>{badge}</Reveal>}
              <Reveal delay={0.05}>
                <h1 className="max-w-[14ch] text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted-foreground max-w-[52ch] text-base leading-relaxed sm:text-lg">
                  {description}
                </p>
              </Reveal>
              {buttons !== false && buttons.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="flex flex-wrap gap-3">
                    {buttons.map((button) => (
                      <LinkButton
                        key={`${button.href}-${button.text}`}
                        variant={button.variant || "default"}
                        size="lg"
                        href={button.href}
                        icon={button.icon}
                        iconRight={button.iconRight}
                      >
                        {button.text}
                      </LinkButton>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
            <Reveal delay={0.2} className="hidden lg:block">
              <HeroVisual />
            </Reveal>
          </div>
        ) : (
          <div className="flex flex-col gap-12 pt-16 sm:gap-24">
            <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
              {badge !== false && badge}
              <h1 className="animate-appear relative z-10 inline-block text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
                {title}
              </h1>
              <p className="text-md animate-appear text-muted-foreground relative z-10 max-w-[65ch] leading-relaxed">
                {description}
              </p>
              {buttons !== false && buttons.length > 0 && (
                <div className="animate-appear relative z-10 flex flex-wrap justify-center gap-4">
                  {buttons.map((button) => (
                    <LinkButton
                      key={`${button.href}-${button.text}`}
                      variant={button.variant || "default"}
                      size="lg"
                      href={button.href}
                      icon={button.icon}
                      iconRight={button.iconRight}
                    >
                      {button.text}
                    </LinkButton>
                  ))}
                </div>
              )}
              {mockup && (
                <div className="relative w-full pt-12">
                  <MockupFrame className="animate-appear" size="small">
                    <Mockup
                      type="responsive"
                      className="bg-background/90 w-full rounded-xl border-0"
                    >
                      {mockup}
                    </Mockup>
                  </MockupFrame>
                  <Glow variant="top" className="animate-appear-zoom" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
