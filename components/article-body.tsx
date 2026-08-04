import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

// Renders scraped article markdown. Inline images are locally saved assets
// under /blog/<slug>/… so a plain lazy <img> is the right call here.
export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-headings:font-heading prose-headings:tracking-tight",
        "prose-a:text-brand prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-img:w-full",
        "prose-h2:mt-12 prose-h2:text-2xl prose-h3:text-xl"
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img loading="lazy" {...props} />
          ),
          a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
