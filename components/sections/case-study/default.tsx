import { Section } from "../../ui/section";

interface CaseMetric {
  label: string;
  value: string;
}

interface CaseStudyProps {
  title?: string;
  industry?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  quote?: string;
  metrics?: CaseMetric[];
  className?: string;
}

export default function CaseStudy({
  title = "客户成功案例",
  industry = "金融",
  client = "某大型金融机构",
  challenge = "",
  solution = "",
  quote = "",
  metrics = [],
  className,
}: CaseStudyProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col gap-10 sm:gap-16">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        <div className="border-border/60 bg-card/40 grid grid-cols-1 gap-8 rounded-2xl border p-8 lg:grid-cols-2 lg:p-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-medium">
                {industry}
              </span>
              <h3 className="text-xl font-semibold">{client}</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="mb-2 font-medium">面临的挑战</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {challenge}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">我们的解决方案</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>
            {quote && (
              <blockquote className="border-brand/30 text-muted-foreground border-l-2 pl-4 text-sm italic">
                {quote}
              </blockquote>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-border/40 bg-background/50 flex flex-col items-center justify-center gap-1 rounded-xl border p-6 text-center"
              >
                <div className="from-foreground to-brand bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                  {metric.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export type { CaseStudyProps };
