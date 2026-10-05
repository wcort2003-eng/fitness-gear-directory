/**
 * Shared data shapes for the site.
 *
 * These describe what a Profile, an Article, and a GearItem look like once
 * their Markdown files have been read. Editing content means editing the
 * Markdown files in /content — you should rarely need to touch this file.
 */

/** One piece of gear or one supplement associated with a profile. */
export interface GearItem {
  /** Product / supplement name, e.g. "Example Brand Whey Protein". */
  name: string;
  /** Grouping used for display, e.g. "Supplement", "Footwear", "Wearable". */
  category: string;
  /** A short, plain-language note about the item. */
  note: string;
  /**
   * Where the claim comes from. For real data later this should cite an
   * interview, article, or video. For v1 it is a clearly-fake placeholder.
   */
  source: string;
  /** Affiliate URL. Placeholder for v1 — swap in real links before launch. */
  affiliateLink: string;
}

/**
 * Whether a profile is a fictional demo example or compiled from public
 * reporting. Drives which disclaimer the profile page shows. Defaults to
 * "fictional" when a file omits it, so a forgotten field never lets demo
 * content masquerade as real.
 */
export type ProfileStatus = "fictional" | "sourced";

/** One person featured in the directory. */
export interface Profile {
  /** URL-safe id derived from the filename, e.g. "alex-ironheart". */
  slug: string;
  /** Fictional demo example, or compiled from public reporting. */
  status: ProfileStatus;
  /** Display name, e.g. "Alex Ironheart". */
  name: string;
  /** One-line description shown under the name. */
  tagline: string;
  /** Primary sport / discipline, used by the sport filter. */
  sport: string;
  /** Training goals, used by the goal filter. One profile can have several. */
  goals: string[];
  /** Short summary shown on directory cards and at the top of the profile. */
  summary: string;
  /** The gear and supplement list. */
  gear: GearItem[];
  /** The Markdown body of the profile (a longer bio / context section). */
  body: string;
}

/** One article (review or research summary). */
export interface Article {
  /** URL-safe id derived from the filename. */
  slug: string;
  /** Headline. */
  title: string;
  /** One-line summary shown in the article list and meta tags. */
  description: string;
  /** Publish date as an ISO string, e.g. "2026-01-15". */
  date: string;
  /** Author name. */
  author: string;
  /** Article type, e.g. "Review" or "Research Summary". */
  category: string;
  /** The Markdown body of the article. */
  body: string;
}
