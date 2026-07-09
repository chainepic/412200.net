import { Section } from "../../ui/section";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  title?: string;
  description?: string;
  items?: TimelineItem[];
  className?: string;
}

export default function Timeline({
  title = "我们的历史，是创新的基石",
  description = "从传统软件到全栈 AI，持续积累行业经验与技术能力。",
  items = [],
  className,
}: TimelineProps) {
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
        <div className="relative w-full max-w-2xl">
          <div className="bg-border absolute top-2 bottom-2 left-[7px] w-px" />
          <div className="flex flex-col gap-8">
            {items.map((item) => (
              <div key={item.year} className="relative flex gap-6 pl-8">
                <div className="bg-brand border-background absolute top-1.5 left-0 size-3.5 rounded-full border-2" />
                <div className="flex flex-col gap-1">
                  <span className="text-brand text-sm font-semibold">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export type { TimelineItem, TimelineProps };
