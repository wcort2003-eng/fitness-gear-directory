/**
 * Reads the Markdown content files in /content and turns them into typed
 * objects the pages can use. This runs at build time (and on the server),
 * never in the browser, so it is safe to touch the filesystem here.
 *
 * To add a person, drop a new .md file in content/profiles.
 * To add an article, drop a new .md file in content/articles.
 * The filename (without .md) becomes the page's URL.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article, GearItem, Profile } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROFILES_DIR = path.join(CONTENT_DIR, "profiles");
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles");

/** Returns the slugs (filenames without extension) in a content folder. */
function readSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** Coerces unknown frontmatter into a clean GearItem list. */
function normalizeGear(raw: unknown): GearItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const g = (item ?? {}) as Partial<GearItem>;
    return {
      name: String(g.name ?? ""),
      category: String(g.category ?? "Uncategorized"),
      note: String(g.note ?? ""),
      source: String(g.source ?? ""),
      affiliateLink: String(g.affiliateLink ?? "#"),
    };
  });
}

// --- Profiles ---------------------------------------------------------------

export function getProfileSlugs(): string[] {
  return readSlugs(PROFILES_DIR);
}

export function getProfileBySlug(slug: string): Profile | undefined {
  const file = path.join(PROFILES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    name: String(data.name ?? slug),
    tagline: String(data.tagline ?? ""),
    sport: String(data.sport ?? "Unspecified"),
    goals: Array.isArray(data.goals) ? data.goals.map(String) : [],
    summary: String(data.summary ?? ""),
    gear: normalizeGear(data.gear),
    body: content.trim(),
  };
}

export function getAllProfiles(): Profile[] {
  return getProfileSlugs()
    .map(getProfileBySlug)
    .filter((p): p is Profile => Boolean(p))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** All distinct sports across profiles, sorted, for the sport filter. */
export function getAllSports(): string[] {
  const set = new Set(getAllProfiles().map((p) => p.sport));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** All distinct goals across profiles, sorted, for the goal filter. */
export function getAllGoals(): string[] {
  const set = new Set(getAllProfiles().flatMap((p) => p.goals));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// --- Articles ---------------------------------------------------------------

export function getArticleSlugs(): string[] {
  return readSlugs(ARTICLES_DIR);
}

export function getArticleBySlug(slug: string): Article | undefined {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Editorial Team"),
    category: String(data.category ?? "Article"),
    body: content.trim(),
  };
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map(getArticleBySlug)
    .filter((a): a is Article => Boolean(a))
    .sort((a, b) => b.date.localeCompare(a.date));
}
