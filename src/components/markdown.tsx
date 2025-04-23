import Link from "next/link";
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { CodeBlock } from "./code-block";
import { H1, H2, H3, H4, H5, H6, P } from "./ui/typography";

const components: Partial<Components> = {
  // @ts-expect-error
  code: CodeBlock,
  pre: ({ children }) => <>{children}</>,
  ol: ({ children, ...props }) => {
    return (
      <ol
        className="m-0 ml-2 flex list-outside list-decimal flex-col space-y-2 p-0"
        {...props}
      >
        {children}
      </ol>
    );
  },
  ul: ({ children, ...props }) => {
    return (
      <ul
        className="m-0 ml-2 flex list-outside list-disc flex-col space-y-2 p-0"
        {...props}
      >
        {children}
      </ul>
    );
  },
  li: ({ children, ...props }) => {
    return (
      <li className="py-0" {...props}>
        {children}
      </li>
    );
  },
  strong: ({ children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  em: ({ children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ children, ...props }) => {
    return <H1 {...props}>{children}</H1>;
  },
  h2: ({ children, ...props }) => {
    return <H2 {...props}>{children}</H2>;
  },
  h3: ({ children, ...props }) => {
    return <H3 {...props}>{children} </H3>;
  },
  h4: ({ children, ...props }) => {
    return <H4 {...props}>{children} </H4>;
  },
  h5: ({ children, ...props }) => {
    return <H5 {...props}>{children} </H5>;
  },
  h6: ({ children, ...props }) => {
    return <H6 {...props}>{children} </H6>;
  },
  p: ({ children, ...props }) => {
    return <P {...props}>{children} </P>;
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
