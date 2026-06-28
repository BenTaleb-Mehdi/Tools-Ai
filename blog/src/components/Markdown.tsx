import React from "react";
import { Image as ImageIcon, CheckCircle } from "lucide-react";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  
  let listItems: string[] = [];
  
  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-foreground/80">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineStyles(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const parseInlineStyles = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-foreground'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic text-foreground/90'>$1</em>")
      .replace(/`(.*?)`/g, "<code class='bg-muted text-primary px-1.5 py-0.5 rounded font-mono text-sm border border-border'>$1</code>");
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Image Placeholder
    if (trimmed.startsWith("[IMAGE:") && trimmed.endsWith("]")) {
      flushList(index);
      const description = trimmed.slice(7, -1).trim();
      elements.push(
        <div key={index} className="my-8 rounded-xl border border-dashed border-border bg-card/60 p-8 text-center flex flex-col items-center justify-center gap-4 transition hover:bg-card hover:border-primary/40 shadow-sm">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <ImageIcon className="h-8 w-8 animate-pulse" />
          </div>
          <div className="max-w-md">
            <p className="font-semibold text-sm mb-1 text-foreground">Visual Component Placeholder</p>
            <p className="text-xs text-muted-foreground italic">{description}</p>
          </div>
        </div>
      );
      return;
    }

    // Unordered List Items
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed)) {
      const itemText = trimmed.replace(/^(\*\s|-\s|\d+\.\s)/, "");
      listItems.push(itemText);
      return;
    }

    // If it's a normal line, first flush any pending list items
    flushList(index);

    if (trimmed === "") {
      return;
    }

    // Headers
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={index} className="text-3xl font-extrabold tracking-tight mt-8 mb-4 border-b border-border pb-2 text-foreground">
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-2xl font-bold tracking-tight mt-8 mb-4 border-b border-border pb-2 text-foreground">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-xl font-semibold tracking-tight mt-6 mb-3 text-foreground">
          {trimmed.slice(4)}
        </h3>
      );
    } 
    // Horizontal Rule
    else if (trimmed === "---") {
      elements.push(<hr key={index} className="my-8 border-border" />);
    }
    // Blockquote
    else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-6 bg-muted/50 text-foreground/80 italic rounded-r-lg">
          <p dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed.slice(2)) }} />
        </blockquote>
      );
    }
    // Normal Paragraph
    else {
      elements.push(
        <p key={index} className="text-base leading-relaxed text-foreground/85 my-4" dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed) }} />
      );
    }
  });

  // Flush any final list items remaining at the end
  flushList(lines.length);

  return <div className="space-y-1">{elements}</div>;
}
