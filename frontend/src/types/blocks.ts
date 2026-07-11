/**
 * Strapi Blocks field JSON shape (same as @strapi/blocks-react-renderer).
 * @see https://github.com/strapi/blocks-react-renderer
 */

export type TextInlineNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type LinkInlineNode = {
  type: "link";
  url: string;
  children: TextInlineNode[];
};

export type ListItemInlineNode = {
  type: "list-item";
  children: DefaultInlineNode[];
};

type DefaultInlineNode = TextInlineNode | LinkInlineNode;

export type ParagraphBlockNode = {
  type: "paragraph";
  children: DefaultInlineNode[];
};

export type QuoteBlockNode = {
  type: "quote";
  children: DefaultInlineNode[];
};

export type CodeBlockNode = {
  type: "code";
  children: DefaultInlineNode[];
};

export type HeadingBlockNode = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: DefaultInlineNode[];
};

export type ListBlockNode = {
  type: "list";
  format: "ordered" | "unordered";
  children: (ListItemInlineNode | ListBlockNode)[];
};

export type ImageBlockNode = {
  type: "image";
  image: {
    name: string;
    alternativeText?: string | null;
    url: string;
    caption?: string | null;
    width: number;
    height: number;
    formats?: Record<string, unknown>;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl?: string | null;
    provider: string;
    provider_metadata?: unknown | null;
    createdAt: string;
    updatedAt: string;
  };
  children: [{ type: "text"; text: "" }];
};

export type BlocksRootNode =
  | ParagraphBlockNode
  | QuoteBlockNode
  | CodeBlockNode
  | HeadingBlockNode
  | ListBlockNode
  | ImageBlockNode;

/** Content of a Strapi `blocks` attribute (API may return `null` when empty). */
export type BlocksContent = BlocksRootNode[];
