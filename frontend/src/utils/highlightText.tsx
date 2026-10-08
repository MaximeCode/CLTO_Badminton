import type { ReactNode } from "react";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Découpe un texte et enveloppe les occurrences de `query` dans <mark>.
 */
export function highlightText(text: string, query: string): ReactNode {
  const needle = query.trim();
  if (!text || !needle) return text;

  const regex = new RegExp(`(${escapeRegExp(needle)})`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part.toLowerCase() === needle.toLowerCase()) {
      return (
        <mark key={`mark-${index}`} className="search-term-mark">
          {part}
        </mark>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
}
