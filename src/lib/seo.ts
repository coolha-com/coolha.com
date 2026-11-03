export const SITE_URL = "https://coolha.com";

export const LOCALES = ["en", "zh-Hans", "zh-Hant"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Builds the canonical URL + hreflang map for a given route path.
 * `path` is the locale-agnostic route, e.g. "" for home, "ai", "rwa".
 */
export function buildAlternates(path: string, locale: string) {
  const suffix = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${suffix}`;
  }
  languages["x-default"] = `${SITE_URL}/en${suffix}`;

  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages,
  };
}

/** Maps an app locale to the Open Graph locale format. */
export function toOgLocale(locale: string): string {
  switch (locale) {
    case "zh-Hans":
      return "zh_CN";
    case "zh-Hant":
      return "zh_TW";
    default:
      return "en_US";
  }
}
