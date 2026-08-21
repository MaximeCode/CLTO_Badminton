import React from 'react';
import { createRoot } from 'react-dom/client';

const COLORS = {
  LOCAL: '#2563eb',
  PREPROD: '#f97316',
  PROD: '#dc2626',
};

function isPrivateIpv4(host) {
  const parts = host.split('.');
  if (parts.length !== 4) return false;
  const octets = parts.map(Number);
  if (octets.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return false;
  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

function getStrapiEnv() {
  const host = window.location.hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    isPrivateIpv4(host)
  ) {
    return 'LOCAL';
  }
  if (host.includes('preprod')) return 'PREPROD';
  return 'PROD';
}

function getEnvTitlePrefix() {
  const env = getStrapiEnv();
  if (env === 'LOCAL') return 'DEV';
  if (env === 'PREPROD') return 'PREPROD';
  return null;
}

function prefixDocumentTitle() {
  const prefix = getEnvTitlePrefix();
  if (!prefix) return;

  const apply = () => {
    const current = document.title;
    if (current.startsWith(`${prefix} `)) return;
    const stripped = current.replace(/^(DEV|PREPROD) /, '');
    document.title = `${prefix} ${stripped}`;
  };

  apply();

  const titleEl = document.querySelector('title');
  if (titleEl) {
    new MutationObserver(apply).observe(titleEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
}

export function EnvBanner() {
  const env = getStrapiEnv();

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: COLORS[env],
        color: '#fff',
        textAlign: 'center',
        padding: '8px 12px',
        fontSize: '14px',
        lineHeight: 1.3,
        fontFamily: 'inherit',
      }}
    >
      <strong>ENVIRONNEMENT {env}</strong>
    </div>
  );
}

export function mountEnvBanner() {
  if (document.getElementById('clto-strapi-env-banner')) return;

  prefixDocumentTitle();

  const el = document.createElement('div');
  el.id = 'clto-strapi-env-banner';
  document.body.prepend(el);
  document.body.style.paddingTop = '36px';
  createRoot(el).render(<EnvBanner />);
}
