"use client";

import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getCodeString } from "rehype-rewrite";
import katex from "katex";
// import "katex/dist/katex.css";
import { useTheme } from "next-themes";

interface RenderMarkdownProps {
  source: string;
  className?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  codeStyle?: React.CSSProperties;
}

const RenderMarkdown = ({
  source,
  className,
  style,
  contentStyle,
  codeStyle,
}: RenderMarkdownProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={className} style={style}>
      <MarkdownPreview
        source={source}
        style={{
          padding: 16,
          background: "none",
          fontSize: "1rem",
          ...contentStyle,
        }}
        wrapperElement={{
          "data-color-mode": theme === "light" ? "light" : "dark",
        }}
        components={{
          code: ({ children = [], className, ...props }) => {
            if (
              typeof children === "string" &&
              /^\$\$(.*)\$\$/.test(children)
            ) {
              const html = katex.renderToString(
                children.replace(/^\$\$(.*)\$\$/, "$1"),
                {
                  throwOnError: false,
                },
              );
              return (
                <code
                  dangerouslySetInnerHTML={{ __html: html }}
                  style={{ ...codeStyle }}
                />
              );
            }
            const code =
              props.node && props.node.children
                ? getCodeString(props.node.children)
                : children;
            if (
              typeof code === "string" &&
              typeof className === "string" &&
              /^language-katex/.test(className.toLocaleLowerCase())
            ) {
              const html = katex.renderToString(code, {
                throwOnError: false,
              });
              return (
                <code
                  style={{ fontSize: "150%", ...codeStyle }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            }
            return (
              <code className={String(className)} style={{ ...codeStyle }}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default RenderMarkdown;
