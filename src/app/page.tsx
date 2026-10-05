import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
          The gear behind the people you follow
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          See what athletes, lifters and fitness figures actually use.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/70">
          Want to train or look like someone you admire? Browse profiles of the
          people you follow and see the gear and supplements associated with
          each one — with a note on what it&apos;s for and a source for where
          the claim comes from.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/profiles"
            className="rounded-md bg-ink px-5 py-3 font-semibold text-paper transition-colors hover:bg-ink-soft"
          >
            Browse profiles
          </Link>
          <Link
            href="/articles"
            className="rounded-md border border-ink/20 px-5 py-3 font-semibold text-ink transition-colors hover:border-gold hover:text-gold-dark"
          >
            Read articles
          </Link>
        </div>
      </section>

      {/* What it is */}
      <section className="border-t border-ink/10 py-12">
        <h2 className="text-2xl font-semibold text-ink">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Pick a person",
              body: "Search the directory and filter by sport or by the goal you're training for.",
            },
            {
              title: "See their kit",
              body: "Each profile lists gear and supplements, what each item is for, and where the claim comes from.",
            },
            {
              title: "Go deeper",
              body: "Articles cover reviews and plain-English summaries of the research behind popular choices.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-ink/10 bg-paper-soft p-5"
            >
              <h3 className="font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust note */}
      <section className="py-12">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-6">
          <h2 className="text-lg font-semibold text-ink">
            Why we show a &ldquo;source&rdquo; on everything
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-ink/70">
            Most &ldquo;what they use&rdquo; lists are guesswork. Every item
            here is meant to carry a source so you can judge it for yourself —
            and nothing here is medical or health advice. (This site is in
            early demo mode: some profiles are clearly-labelled fictional
            examples and others are compiled from public reporting — each
            profile says which at the top.)
          </p>
        </div>
      </section>

      {/* Email signup */}
      <section className="pb-20">
        <EmailCapture />
      </section>
    </div>
  );
}
