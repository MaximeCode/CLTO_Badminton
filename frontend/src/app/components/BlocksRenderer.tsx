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
type BlocksSize = "sm" | "base" | "lg";

type VariantStyles = {
  paragraph: string;
  heading: string;
  strong: string;
  underline: string;
  link: string;
  quote: string;
  code: string;
  figcaption: string;
  list: string;
};

/** Text size for paragraphs / lists. Default `lg` preserves existing look. */
const SIZE_TEXT: Record<BlocksSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const SIZE_TEXT_MD: Record<BlocksSize, string> = {
  sm: "md:text-sm",
  base: "md:text-base",
  lg: "md:text-lg",
};

/** Mobile = `size` ; dès `md` = `sizeDesktop` si fourni. */
function resolveSizeClass(size: BlocksSize, sizeDesktop?: BlocksSize): string {
  if (!sizeDesktop || sizeDesktop === size) {
    return SIZE_TEXT[size];
  }
  return `${SIZE_TEXT[size]} ${SIZE_TEXT_MD[sizeDesktop]}`;
}

const VARIANT_STYLES: Record<BlocksVariant, Omit<VariantStyles, "paragraph" | "quote" | "list">> = {
  default: {
    heading: "text-primary",
    strong: "text-primary",
    underline: "text-primary",
    link: "text-[var(--burgundy)] underline hover:opacity-80",
    code: "rounded bg-muted px-1.5 py-0.5 text-sm font-mono",
    figcaption: "mt-2 text-center text-sm text-muted-foreground",
  },
  onPrimary: {
    heading: "text-white",
    strong: "text-secondary",
    underline: "text-secondary",
    link: "text-secondary underline hover:opacity-80",
    code: "rounded bg-white/15 px-1.5 py-0.5 text-sm font-mono text-white",
    figcaption: "mt-2 text-center text-sm text-white/70",
  },
};

function resolveStyles(
  variant: BlocksVariant,
  size: BlocksSize,
  sizeDesktop?: BlocksSize,
): VariantStyles {
  const base = VARIANT_STYLES[variant];
  const sizeClass = resolveSizeClass(size, sizeDesktop);
  const paragraphSpacing = variant === "onPrimary" ? "mb-3 sm:mb-4" : "mb-4";
  const quoteBorder =
    variant === "onPrimary"
      ? "mb-6 border-l-4 border-secondary pl-6 italic text-white/80"
      : "mb-6 border-l-4 border-[var(--burgundy)] pl-6 italic text-muted-foreground";
  const paragraphColor = variant === "onPrimary" ? "text-white/90" : "text-foreground/80";

  return {
    ...base,
    paragraph: `${paragraphSpacing} ${sizeClass} ${paragraphColor} leading-relaxed`,
    quote: `${quoteBorder} ${sizeClass}`,
    list: sizeClass,
  };
}

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
      ? `list-decimal pl-6 space-y-2`
      : `list-disc pl-6 space-y-2`;

  return (
    <Tag key={key} className={listClass}>
      {list.children.map((child, index) => {
        if (child.type === "list") {
          return renderList(child, `${key}-nested-${index}`, styles);
        }
        const item = child as ListItemInlineNode;
        return (
          <li key={`${key}-item-${index}`} className={`${styles.list} leading-relaxed`}>
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
  resolvedLevel?: number,
): React.ReactNode {
  const key = `block-${index}`;

  switch (block.type) {
    case "heading": {
      const heading = block as HeadingBlockNode;
      const level = (resolvedLevel ??
        Math.min(6, Math.max(1, heading.level))) as 1 | 2 | 3 | 4 | 5 | 6;
      const className =
        level <= 2
          ? `mb-4 mt-10 first:mt-0 ${styles.heading}`
          : `mb-3 mt-8 ${styles.heading}`;
      const style =
        level <= 2 ? { fontFamily: "var(--font-heading)" } : undefined;
      const children = renderInline(heading.children, key, styles);
      const sizeClass =
        level === 1
          ? "text-4xl md:text-5xl"
          : level === 2
            ? "text-3xl md:text-4xl"
            : level === 3
              ? "text-2xl"
              : level === 4
                ? "text-xl"
                : level === 5
                  ? "text-lg"
                  : "text-base";
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

      return (
        <Tag key={key} className={`${sizeClass} ${className}`} style={style}>
          {children}
        </Tag>
      );
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
            className="w-full rounded-2xl shadow-md max-h-150 object-contain"
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
  /** Taille mobile des paragraphes / listes. Défaut `lg` = comportement historique. */
  size?: BlocksSize;
  /** Taille dès `md`. Si omis, `size` s’applique à toutes les largeurs. */
  sizeDesktop?: BlocksSize;
  /**
   * Niveau de départ des titres du bloc (ex. 1 → le titre le plus haut du CMS
   * devient un h2). Les niveaux relatifs CMS sont conservés sans trous.
   */
  headingOffset?: number;
};

/**
 * Remappe les titres CMS en outline SEO correct :
 * - le niveau le plus haut du contenu → `1 + headingOffset`
 * - les niveaux suivants restent relatifs, sans saut (h3+h5 → h2+h3 si offset=1)
 */
function buildNormalizedHeadingLevels(
  content: BlocksContent,
  headingOffset: number,
): Map<number, number> {
  const headingEntries: { index: number; level: number }[] = [];

  content.forEach((block, index) => {
    if (block.type === "heading") {
      headingEntries.push({ index, level: block.level });
    }
  });

  const uniqueSorted = [...new Set(headingEntries.map((h) => h.level))].sort(
    (a, b) => a - b,
  );
  const rankByLevel = new Map(uniqueSorted.map((level, rank) => [level, rank]));
  const baseLevel = Math.min(6, Math.max(1, 1 + headingOffset));

  const normalized = new Map<number, number>();
  for (const { index, level } of headingEntries) {
    const rank = rankByLevel.get(level) ?? 0;
    normalized.set(index, Math.min(6, baseLevel + rank));
  }
  return normalized;
}

export function BlocksRenderer({
  content,
  variant = "default",
  size = "lg",
  sizeDesktop,
  headingOffset = 0,
}: BlocksRendererProps) {
  if (!content.length) {
    return null;
  }

  const styles = resolveStyles(variant, size, sizeDesktop);
  const headingLevels = buildNormalizedHeadingLevels(content, headingOffset);

  return (
    <div className="blocks-content">
      {content.map((block, i) =>
        renderBlock(block, i, styles, headingLevels.get(i)),
      )}
    </div>
  );
}
