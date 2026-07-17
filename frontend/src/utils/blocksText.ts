import type { BlocksContent } from "@/types/blocks";

/**
 * Flatten Strapi blocks JSON into plain text.
 * Pass `maxLength` to stop early (excerpts) instead of walking the whole tree.
 */
export function extractTextFromBlocks(
  nodes: BlocksContent | unknown[],
  maxLength?: number
): string {
  const parts: string[] = [];
  let length = 0;

  const walk = (list: unknown[]): boolean => {
    for (const node of list) {
      const n = node as Record<string, unknown>;

      if (n.type === "text" && typeof n.text === "string") {
        const text = n.text;
        if (maxLength !== undefined && length + text.length >= maxLength) {
          parts.push(text.slice(0, maxLength - length));
          return true;
        }
        parts.push(text);
        length += text.length;
      } else if (Array.isArray(n.children)) {
        if (walk(n.children)) return true;
      }
    }
    return false;
  };

  walk(nodes);

  const result = parts.join(" ").replace(/\s+/g, " ").trim();
  if (maxLength === undefined || result.length <= maxLength) {
    return result;
  }
  return `${result.slice(0, maxLength).trimEnd()}…`;
}
