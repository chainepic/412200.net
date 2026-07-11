import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Section } from "../../ui/section";

interface PricingTableProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function PricingPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
      <h1 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
        {title}
      </h1>
      <p className="text-muted-foreground text-md max-w-[600px] font-medium sm:text-xl">
        {description}
      </p>
    </div>
  );
}

export function PricingCategorySection({
  title,
  titleHref,
  description,
  children,
  className,
}: PricingTableProps & { titleHref?: string }) {
  const titleEl = titleHref ? (
    <a
      href={titleHref}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-brand w-fit transition-colors"
    >
      {title}
    </a>
  ) : (
    title
  );

  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col gap-8 sm:gap-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold sm:text-3xl">{titleEl}</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        </div>
        {children}
      </div>
    </Section>
  );
}

export function PricingCard({
  name,
  price,
  unit,
  description,
  features = [],
  highlight = false,
  invoice = false,
}: {
  name: string;
  price: string;
  unit?: string;
  description: string;
  features?: string[];
  highlight?: boolean;
  invoice?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-3xl p-6 sm:p-8",
        highlight ? "bg-brand/8 ring-brand/15 ring-1" : "bg-muted/20",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          {invoice && (
            <span className="bg-brand/10 text-brand rounded-full px-2 py-0.5 text-xs font-medium">
              可开票
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          {unit && (
            <span className="text-muted-foreground text-sm">{unit}</span>
          )}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {features.length > 0 && (
        <ul className="flex flex-col gap-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-muted-foreground flex items-center gap-2 text-sm"
            >
              <span className="bg-brand size-1.5 shrink-0 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
