import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ markdown, className = "" }: { markdown: string; className?: string }) {
  return (
    <div
      className={`prose-content space-y-5 leading-relaxed text-ink-muted [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
