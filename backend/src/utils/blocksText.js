'use strict';

/**
 * Extrait du texte brut depuis les blocks Strapi (excerpt homepage).
 */
function extractTextFromBlocks(nodes, maxLength) {
  if (!Array.isArray(nodes)) return '';

  const parts = [];
  let length = 0;

  const walk = (list) => {
    for (const node of list) {
      if (!node || typeof node !== 'object') continue;

      if (node.type === 'text' && typeof node.text === 'string') {
        const text = node.text;
        if (maxLength !== undefined && length + text.length >= maxLength) {
          parts.push(text.slice(0, maxLength - length));
          return true;
        }
        parts.push(text);
        length += text.length;
      } else if (Array.isArray(node.children)) {
        if (walk(node.children)) return true;
      }
    }
    return false;
  };

  walk(nodes);

  const result = parts.join(' ').replace(/\s+/g, ' ').trim();
  if (maxLength === undefined || result.length <= maxLength) {
    return result;
  }
  return `${result.slice(0, maxLength).trimEnd()}…`;
}

module.exports = { extractTextFromBlocks };
