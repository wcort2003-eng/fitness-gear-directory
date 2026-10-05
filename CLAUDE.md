@AGENTS.md

# Fitness Gear Directory

> The line above imports `AGENTS.md`, which Next.js auto-generates and manages.
> Leave it in place. Everything below is the project's own guidance.

## Product

A directory site where visitors browse athletes, lifters and fitness figures
and see the gear and supplements associated with each one, with an affiliate
link on every item. The target reader wants to train or look like someone they
admire and wants to know what that person actually uses. There are also a few
article pages for reviews and research summaries.

## Stack

- **Next.js (App Router) + TypeScript** — statically generated pages.
- **Tailwind CSS v4** — theme tokens live in `src/app/globals.css` (`@theme`).
- **Content as Markdown** — profiles and articles are `.md` files in
  `content/`, read at build time via `src/lib/content.ts`. No database.
- **Deploys on Vercel's free tier** — static output, no server required.

Palette: "dark shell, light page, gold accent" — charcoal (`ink`) header/
footer, warm off-white (`paper`) reading surface, restrained gold (`gold`)
for links, buttons and active states only.

## v1 scope (build only this)

1. Home page explaining the site, with an email signup.
2. Profiles directory page listing all profiles, with search and a filter by
   sport and by goal.
3. Profile template showing one person's gear and supplement list. Each item
   has: `name`, `note`, `category`, `source`, and an `affiliateLink`.
4. Articles section: a list page and a Markdown-based article template.
5. One reusable email capture component (wired to a placeholder).
6. A visible disclaimer component for any health or supplement content.

**Do NOT build:** user accounts, login, buying/selling, payments, or any
influencer features.

## Placeholder-data rule (important)

Use clearly-labelled placeholder data only. All example profiles are obviously
fictional. **Do not state real gear or supplement claims about real named
people** — real data must be sourced and verified by the site owner before
anything goes live. Every gear item carries a `source` field for exactly this
reason, and affiliate links are `"#"` placeholders for now.

## Project layout

```
content/profiles/*.md   one Markdown file per person
content/articles/*.md   one Markdown file per article
src/app/                routes (home, /profiles, /profiles/[slug], /articles, /articles/[slug])
src/components/         UI components (EmailCapture, Disclaimer, GearItem, ...)
src/lib/                content.ts (reads Markdown), types.ts, format.ts
```

## Conventions

- Adding content = adding a Markdown file; the filename becomes the URL slug.
- Keep the `Disclaimer` component on any page showing gear/supplements/health.
- Every profile has a `status` field: `fictional` (invented demo example) or
  `sourced` (compiled from public reporting). It drives `ProfileNotice`, which
  shows the right top-of-profile disclaimer automatically. Missing/invalid
  defaults to `fictional`, so demo content is never presented as real.
- `sourced` profiles use outlet-level citations ("reported by …"). Do not
  invent URLs, dates or titles, and do not mark a claim as individually
  verified until a per-claim source link has been added and checked.
- Affiliate links must keep `rel="nofollow sponsored"`.
