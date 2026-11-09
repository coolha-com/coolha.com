/**
 * Minimal Markdown subset for the legal pages.
 * Supports frontmatter, `##` / `###` headings, paragraphs, `-` lists,
 * `**bold**`, `[label](href)`, and hard line breaks (two trailing spaces).
 * Raw HTML is rejected. This is intentionally not a general Markdown engine.
 */

export interface LegalMeta {
  title: string;
  description: string;
  breadcrumb: string;
  home: string;
  onThisPage: string;
  effectiveLabel: string;
  lastUpdatedLabel: string;
  effectiveDate: string;
  lastUpdated: string;
  inLanguage: "en" | "zh-Hans" | "zh-Hant";
  ogAlt: string;
  datePublished: string;
  dateModified: string;
  breadcrumbAria: string;
  tocAria: string;
}

export interface LegalTocItem {
  id: string;
  title: string;
}

export interface ParsedLegalMarkdown {
  meta: LegalMeta;
  html: string;
  toc: LegalTocItem[];
}

const REQUIRED_META = [
  "title",
  "description",
  "breadcrumb",
  "home",
  "onThisPage",
  "effectiveLabel",
  "lastUpdatedLabel",
  "effectiveDate",
  "lastUpdated",
  "inLanguage",
  "ogAlt",
  "datePublished",
  "dateModified",
  "breadcrumbAria",
  "tocAria",
] as const;

const LANGUAGES = new Set(["en", "zh-Hans", "zh-Hant"]);

export interface LegalLocaleSelection {
  routeLocale: string;
  contentLocale: string;
  fellBackToEnglish: boolean;
}

/**
 * Unknown locales are treated as English.
 * A known locale with no file falls back to English; `fellBackToEnglish` is
 * then true and the caller renders the English document.
 */
export function selectLegalContentLocale(
  locale: string,
  fileExists: (locale: string) => boolean,
  knownLocales: readonly string[],
  defaultLocale: string,
): LegalLocaleSelection {
  const routeLocale = knownLocales.includes(locale) ? locale : defaultLocale;
  if (fileExists(routeLocale)) {
    return { routeLocale, contentLocale: routeLocale, fellBackToEnglish: false };
  }
  return {
    routeLocale,
    contentLocale: defaultLocale,
    fellBackToEnglish: routeLocale !== defaultLocale,
  };
}

export function parseLegalMarkdown(raw: string): ParsedLegalMarkdown {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const { meta, body } = parseFrontmatter(normalized);
  if (body.includes("<")) {
    throw new Error("legal markdown does not allow raw HTML");
  }

  const toc: LegalTocItem[] = [];
  const seen = new Set<string>();
  let html = "";
  let open = false;

  const close = () => {
    if (open) {
      html += "</section>";
      open = false;
    }
  };

  const ensureOpen = () => {
    if (!open) {
      throw new Error("content appears before the first section");
    }
  };

  const blocks = body
    .split(/\n(?:[ \t]*\n)+/)
    .map((block) => block.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (block.startsWith("## ")) {
      const match = /^##\s+(.+?)\s*\{#([A-Za-z0-9-]+)\}\s*$/.exec(block);
      if (!match) {
        throw new Error(`section heading must be "## Title {#id}": ${block}`);
      }
      const title = match[1].trim();
      const id = match[2];
      if (seen.has(id)) {
        throw new Error(`duplicate heading id: ${id}`);
      }
      seen.add(id);
      toc.push({ id, title });
      close();
      html += `<section id="${escapeAttr(id)}"><h2>${escapeHtml(title)}</h2>`;
      open = true;
      continue;
    }

    if (block.startsWith("### ")) {
      ensureOpen();
      const title = block.replace(/^###\s+/, "").trim();
      if (!title || title.includes("{#")) {
        throw new Error(`invalid subsection heading: ${block}`);
      }
      html += `<h3>${escapeHtml(title)}</h3>`;
      continue;
    }

    ensureOpen();
    if (isList(block)) {
      html += renderList(block);
    } else {
      html += renderParagraph(block);
    }
  }

  close();
  if (toc.length === 0) {
    throw new Error("legal markdown has no sections");
  }

  return { meta, html, toc };
}

function parseFrontmatter(raw: string): { meta: LegalMeta; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("missing frontmatter");
  }
  const end = raw.indexOf("\n---\n", 3);
  if (end === -1) {
    throw new Error("unterminated frontmatter");
  }
  const block = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const values: Record<string, string> = {};

  for (const line of block.split("\n")) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx <= 0) {
      throw new Error(`bad frontmatter line: ${line}`);
    }
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!value) {
      throw new Error(`empty frontmatter value: ${key}`);
    }
    if (key in values) {
      throw new Error(`duplicate frontmatter key: ${key}`);
    }
    values[key] = value;
  }

  for (const key of REQUIRED_META) {
    if (!values[key]) {
      throw new Error(`missing frontmatter key: ${key}`);
    }
  }

  if (!LANGUAGES.has(values.inLanguage)) {
    throw new Error(`invalid inLanguage: ${values.inLanguage}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.datePublished) || !/^\d{4}-\d{2}-\d{2}$/.test(values.dateModified)) {
    throw new Error("datePublished and dateModified must be YYYY-MM-DD");
  }

  return { meta: values as unknown as LegalMeta, body };
}

function isList(block: string): boolean {
  const lines = block.split("\n").filter((line) => line.trim() !== "");
  return lines.length > 0 && lines.every((line) => line.startsWith("- "));
}

function renderList(block: string): string {
  const items = block
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const match = /^- (.*)$/.exec(line);
      if (!match || !match[1].trim()) {
        throw new Error(`invalid list item: ${line}`);
      }
      return `<li>${renderInline(match[1].trim())}</li>`;
    });
  return `<ul>${items.join("")}</ul>`;
}

function renderParagraph(block: string): string {
  const lines = block.split("\n");
  const parts: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const hard = /[ \t]{2}$/.test(lines[i]);
    const text = lines[i].replace(/[ \t]+$/, "");
    if (!text.trim()) continue;
    parts.push(renderInline(text.trim()));
    if (i < lines.length - 1) {
      parts.push(hard ? "<br />" : " ");
    }
  }
  if (parts.length === 0) {
    throw new Error("empty paragraph");
  }
  return `<p>${parts.join("")}</p>`;
}

function renderInline(input: string): string {
  let i = 0;
  let out = "";
  while (i < input.length) {
    if (input.startsWith("**", i)) {
      const end = input.indexOf("**", i + 2);
      if (end === -1) {
        throw new Error(`unclosed bold: ${input}`);
      }
      out += `<strong>${renderInline(input.slice(i + 2, end))}</strong>`;
      i = end + 2;
      continue;
    }

    if (input[i] === "[") {
      const close = input.indexOf("]", i + 1);
      if (close !== -1 && input[close + 1] === "(") {
        const hrefEnd = input.indexOf(")", close + 2);
        if (hrefEnd !== -1) {
          const label = input.slice(i + 1, close);
          const href = input.slice(close + 2, hrefEnd);
          if (!isSafeHref(href)) {
            throw new Error(`unsafe or invalid link: ${href}`);
          }
          out += `<a href="${escapeAttr(href)}">${renderInline(label)}</a>`;
          i = hrefEnd + 1;
          continue;
        }
      }
    }

    let j = i + 1;
    while (j < input.length && input[j] !== "[" && !input.startsWith("**", j)) {
      j++;
    }
    out += escapeHtml(input.slice(i, j));
    i = j;
  }
  return out;
}

function isSafeHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\") && !href.includes(" ")) {
    return true;
  }
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, "&quot;");
}
