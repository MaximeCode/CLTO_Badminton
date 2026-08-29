/**
 * Retire le slot hero injecté au build dans index.html une fois React monté.
 */
export function hideLcpPrerender() {
  const slot = document.getElementById('lcp-hero-slot');
  if (slot) {
    slot.remove();
    return;
  }
  document.getElementById('lcp-hero-prerender')?.remove();
}
