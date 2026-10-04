# Fitness Gear Directory

A directory site where visitors browse fitness figures and see the gear and
supplements associated with each one, plus articles for reviews and research
summaries. Built with Next.js, TypeScript and Tailwind CSS. Content is stored
as Markdown files, so **you can add and edit everything without a database or
any coding**.

> **Demo mode.** Every person, product and claim in the repo is a clearly
> fictional placeholder. See [Placeholder data](#placeholder-data) before
> adding anything real.

---

## Run it locally (preview in your browser)

You need [Node.js](https://nodejs.org) 18.18 or newer installed. Then, from a
terminal in this folder:

```bash
npm install      # one time: downloads the project's dependencies
npm run dev      # starts the site in development mode
```

Then open **http://localhost:3000** in your browser. Leave the `npm run dev`
window running while you work; the site updates automatically as you edit
files. Press `Ctrl+C` in that window to stop it.

To preview the real, optimised production build instead:

```bash
npm run build    # builds the static site
npm run start    # serves the built site at http://localhost:3000
```

---

## Editing content

All content lives in the `content/` folder as Markdown (`.md`) files. **The
filename (without `.md`) becomes the page's web address.**

### Add or edit a person

Create a file in `content/profiles/`, e.g. `content/profiles/jane-doe.md`:

```markdown
---
name: Jane Doe
tagline: Short one-line description
sport: Powerlifting           # used by the "sport" filter
goals:                        # used by the "goal" filter
  - Strength
  - Muscle Gain
summary: >-
  A sentence or two shown on the directory card and at the top of the profile.
gear:
  - name: Product name
    category: Supplement       # groups items on the page
    note: A short, plain note about this item.
    source: Where this claim comes from (link or citation).
    affiliateLink: "https://example.com/your-affiliate-link"
---

Optional longer bio here, in normal Markdown.
```

The page appears automatically at `/profiles/jane-doe`.

### Add or edit an article

Create a file in `content/articles/`, e.g.
`content/articles/my-review.md`:

```markdown
---
title: My review
description: One-line summary shown in the list.
date: "2026-03-01"
author: Your Name
category: Review              # or "Research Summary", etc.
---

Your article body in Markdown.
```

The page appears automatically at `/articles/my-review`.

---

## Placeholder data

This site ships with **fictional** example people and articles so you can see
the layout. Before going live:

1. Replace the example profiles and articles with real content.
2. Put a **real source** in every gear item's `source` field.
3. Replace every `"#"` / example `affiliateLink` with your real link.
4. Do **not** publish gear or supplement claims about real named people until
   you have sourced and verified them yourself.

The site-wide "Demo site" banner and the health disclaimer are components
(`src/components/PlaceholderBanner.tsx` and `Disclaimer.tsx`). Keep the
disclaimer on any health/supplement content; remove the demo banner only once
all data is real and sourced.

## Connecting the email signup

The signup form (`src/components/EmailCapture.tsx`) currently shows a success
message but **sends nothing**. To connect a provider (Mailchimp, Buttondown,
ConvertKit, etc.) later, replace the marked `PLACEHOLDER` section inside
`handleSubmit` with a call to the provider's form endpoint. The look and feel
can stay the same.

---

## Deploying to Vercel (free tier)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click
   **Add New → Project**.
3. Pick this repository. Vercel detects Next.js automatically — you can accept
   all the defaults and click **Deploy**.
4. Every time you push to your branch, Vercel rebuilds and redeploys.

No environment variables or paid features are required for v1.

---

## A note on `npm audit` warnings

Running `npm install` may report a few "high severity" warnings for a package
called `braces`. These are **safe to ignore for now**:

- They come only from the code linter (`eslint-config-next`), which runs on
  your machine when you run `npm run lint` — never on your live website.
- The `braces` package currently has **no fixed version available**, so there
  is nothing to upgrade to yet.
- Your deployed site does not include this package, so visitors are not
  exposed to it.

If a patched version is released later, `npm update` will pick it up.

---

## Project structure

```
content/
  profiles/      one Markdown file per person
  articles/      one Markdown file per article
src/
  app/           pages (home, profiles, articles, and their templates)
  components/    reusable UI (email capture, disclaimer, cards, gear rows)
  lib/           reads the Markdown files and defines the data shapes
public/          images and static files
```

## Tech summary

| Piece        | Choice                              |
| ------------ | ----------------------------------- |
| Framework    | Next.js (App Router)                |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS v4                     |
| Content      | Markdown files (read at build time) |
| Hosting      | Vercel free tier (static output)    |
