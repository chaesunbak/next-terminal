import { type ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: ReactNode;
  inline?: boolean;
  className: string;
}

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const inline =
    !(children as string).includes("\n") && (children as string).length <= 100;

  const language = /language-(\w+)/.exec(className || "");

  if (!inline) {
    return (
      <SyntaxHighlighter
        style={dracula}
        PreTag="div"
        language={language?.[1]}
        {...props}
      >
        {children as string}
      </SyntaxHighlighter>
    );
  } else {
    return (
      <code
        className={cn(
          "inline rounded-md bg-zinc-100 px-1 py-0.5 text-sm whitespace-nowrap dark:bg-zinc-800",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
}
