type SiteEnv = "LOCAL" | "PREPROD";

const BG: Record<SiteEnv, string> = {
  LOCAL: "bg-blue-600",
  PREPROD: "bg-orange-500",
};

function isPrivateIpv4(host: string): boolean {
  const parts = host.split(".");
  if (parts.length !== 4) return false;
  const octets = parts.map(Number);
  if (octets.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return false;
  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

function isLocalHost(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    isPrivateIpv4(host)
  );
}

export function getPublicSiteEnv(): SiteEnv | null {
  const host = window.location.hostname.toLowerCase();
  if (isLocalHost(host)) return "LOCAL";
  if (host.includes("preprod")) return "PREPROD";
  return null;
}

export function getEnvTitlePrefix(): "DEV" | "PREPROD" | null {
  const env = getPublicSiteEnv();
  if (env === "LOCAL") return "DEV";
  if (env === "PREPROD") return "PREPROD";
  return null;
}

export function withEnvTitlePrefix(title: string): string {
  const prefix = getEnvTitlePrefix();
  if (!prefix) return title;
  const stripped = title.replace(/^(DEV|PREPROD) /, "");
  return `${prefix} ${stripped}`;
}

export function EnvBanner() {
  const env = getPublicSiteEnv();
  if (!env) return null;

  return (
    <div className={`${BG[env]} py-2 text-center text-sm text-white`} role="status">
      <strong>ENVIRONNEMENT {env}</strong>
    </div>
  );
}
