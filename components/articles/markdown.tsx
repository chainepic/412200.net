import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold tracking-tight first:mt-0 sm:text-[1.65rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-foreground mt-8 mb-3 text-xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-foreground mt-6 mb-2 text-lg font-medium tracking-tight">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground mb-5 text-[1.05rem] leading-[1.85]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="text-muted-foreground mb-6 list-disc space-y-2.5 pl-5 text-[1.05rem] leading-[1.75]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-muted-foreground mb-6 list-decimal space-y-2.5 pl-5 text-[1.05rem] leading-[1.75]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-brand/40 text-foreground/90 my-8 border-l-2 pl-5 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border/60 my-10" />,
  table: ({ children }) => (
    <div className="border-border/50 my-8 overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted/30 text-foreground">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-border/40 px-4 py-3 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-border/30 text-muted-foreground border-t px-4 py-3 align-top leading-relaxed">
      {children}
    </td>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className?.includes("language-"));
    if (isBlock) {
      return (
        <code className="font-mono text-[0.9rem] leading-relaxed">{children}</code>
      );
    }
    return (
      <code className="bg-muted/40 text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-muted/25 border-border/40 mb-6 overflow-x-auto rounded-2xl border p-4 text-sm">
      {children}
    </pre>
  ),
};

export function ArticleMarkdown({ content }: { content: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
