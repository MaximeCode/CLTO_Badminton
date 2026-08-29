/**
 * Retire l’image hero injectée au build dans index.html une fois React monté.
 */
export function hideLcpPrerender() {
  const el = document.getElementById('lcp-hero-prerender');
  if (el) el.remove();
}
