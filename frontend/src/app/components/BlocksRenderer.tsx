import type {
  BlocksContent,
  BlocksRootNode,
  HeadingBlockNode,
  ListBlockNode,
  ListItemInlineNode,
  TextInlineNode,
} from "@/types/blocks";
import { API_URL } from "@/api/Client";
import React from "react";

type InlineNode = TextInlineNode | { type: "link"; url: string; children: TextInlineNode[] };

type BlocksVariant = "default" | "onPrimary";

type VariantStyles = {
  paragraph: string;
  heading: string;
  strong: string;
  underline: string;
  link: string;
  quote: string;
  code: string;
  figcaption: string;
};

const VARIANT_STYLES: Record<BlocksVariant, VariantStyles> = {
  default: {
    paragraph: "mb-4 text-lg text-foreground/80 leading-relaxed",
    heading: "text-primary",
    strong: "text-primary",
    underline: "text-primary",
    link: "text-[var(--burgundy)] underline hover:opacity-80",
    quote: "mb-6 border-l-4 border-[var(--burgundy)] pl-6 italic text-muted-foreground",
    code: "rounded bg-muted px-1.5 py-0.5 text-sm font-mono",
    figcaption: "mt-2 text-center text-sm text-muted-foreground",
  },
  onPrimary: {
    paragraph: "mb-3 sm:mb-4 text-base sm:text-lg text-white/90 leading-relaxed",
    heading: "text-white",
    strong: "text-secondary",
    underline: "text-secondary",
    link: "text-secondary underline hover:opacity-80",
    quote: "mb-6 border-l-4 border-secondary pl-6 italic text-white/80",
    code: "rounded bg-white/15 px-1.5 py-0.5 text-sm font-mono text-white",
    figcaption: "mt-2 text-center text-sm text-white/70",
  },
};

function renderInline(
  nodes: InlineNode[],
  keyPrefix: string,
  styles: VariantStyles,
): React.ReactNode {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    if (node.type === "link") {
      return (
        <a
          key={key}
          href={node.url}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderInline(node.children, key, styles)}
        </a>
      );
    }

    let content: React.ReactNode = node.text || null;
    if (node.bold) content = <strong key={`${key}-b`} className={styles.strong}>{content}</strong>;
    if (node.italic) content = <em key={`${key}-i`}>{content}</em>;
    if (node.underline) content = <u key={`${key}-u`} className={styles.underline}>{content}</u>;
    if (node.strikethrough) content = <s key={`${key}-s`}>{content}</s>;
    if (node.code) {
      content = (
        <code key={`${key}-c`} className={styles.code}>
          {content}
        </code>
      );
    }

    return <React.Fragment key={key}>{content}</React.Fragment>;
  });
}

function renderList(
  list: ListBlockNode,
  key: string,
  styles: VariantStyles,
): React.ReactNode {
  const Tag = list.format === "ordered" ? "ol" : "ul";
  const listClass =
    list.format === "ordered"
      ? "list-decimal pl-6 space-y-2"
      : "list-disc pl-6 space-y-2";

  return (
    <Tag key={key} className={listClass}>
      {list.children.map((child, index) => {
        if (child.type === "list") {
          return renderList(child, `${key}-nested-${index}`, styles);
        }
        const item = child as ListItemInlineNode;
        return (
          <li key={`${key}-item-${index}`} className="leading-relaxed">
            {renderInline(item.children, `${key}-item-${index}`, styles)}
          </li>
        );
      })}
    </Tag>
  );
}

function renderBlock(
  block: BlocksRootNode,
  index: number,
  styles: VariantStyles,
): React.ReactNode {
  const key = `block-${index}`;

  switch (block.type) {
    case "heading": {
      const heading = block as HeadingBlockNode;
      const className =
        heading.level <= 2
          ? `mb-4 mt-10 first:mt-0 ${styles.heading}`
          : `mb-3 mt-8 ${styles.heading}`;
      const style =
        heading.level <= 2 ? { fontFamily: "var(--font-heading)" } : undefined;
      const children = renderInline(heading.children, key, styles);

      switch (heading.level) {
        case 1:
          return (
            <h1 key={key} className={`text-4xl md:text-5xl ${className}`} style={style}>
              {children}
            </h1>
          );
        case 2:
          return (
            <h2 key={key} className={`text-3xl md:text-4xl ${className}`} style={style}>
              {children}
            </h2>
          );
        case 3:
          return (
            <h3 key={key} className={`text-2xl ${className}`} style={style}>
              {children}
            </h3>
          );
        case 4:
          return (
            <h4 key={key} className={`text-xl ${className}`} style={style}>
              {children}
            </h4>
          );
        case 5:
          return (
            <h5 key={key} className={`text-lg ${className}`} style={style}>
              {children}
            </h5>
          );
        case 6:
          return (
            <h6 key={key} className={`text-base ${className}`} style={style}>
              {children}
            </h6>
          );
      }
    }
    case "paragraph":
      return (
        <p key={key} className={styles.paragraph}>
          {renderInline(block.children, key, styles)}
        </p>
      );
    case "quote":
      return (
        <blockquote key={key} className={styles.quote}>
          {renderInline(block.children, key, styles)}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={key}
          className="mb-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
        >
          <code>{block.children.map((c) => ("text" in c ? c.text : "")).join("")}</code>
        </pre>
      );
    case "list":
      return <div key={key} className="mb-6">{renderList(block, key, styles)}</div>;
    case "image": {
      const src = block.image.url.startsWith("http")
        ? block.image.url
        : `${API_URL}${block.image.url}`;
      return (
        <figure key={key} className="my-8">
          <img
            src={src}
            alt={block.image.alternativeText ?? block.image.name}
            className="w-full rounded-2xl shadow-md max-h-100 object-cover"
            width={block.image.width}
            height={block.image.height}
          />
          {block.image.caption && (
            <figcaption className={styles.figcaption}>
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    default:
      return null;
  }
}

type BlocksRendererProps = {
  content: BlocksContent;
  /** `onPrimary` = texte clair pour fond coloré (ex. Mot du Président) */
  variant?: BlocksVariant;
};

export function BlocksRenderer({ content, variant = "default" }: BlocksRendererProps) {
  if (!content.length) {
    return null;
  }

  const styles = VARIANT_STYLES[variant];

  return <div className="blocks-content">{content.map((block, i) => renderBlock(block, i, styles))}</div>;
}
