import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Reviews and plain-English summaries of the research behind popular fitness gear and supplements.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Articles</h1>
      <p className="mt-2 text-ink/70">
        Reviews and plain-English summaries of the research behind popular gear
        and supplements.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-ink/20 p-8 text-center text-ink/50">
          No articles yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group block rounded-xl border border-ink/10 bg-paper-soft p-5 transition-colors hover:border-gold"
              >
                <div className="flex items-center gap-3 text-xs text-ink/50">
                  <span className="rounded bg-gold/10 px-2 py-0.5 font-medium text-gold-dark">
                    {article.category}
                  </span>
                  {article.date && <span>{formatDate(article.date)}</span>}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-ink group-hover:text-gold-dark">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-ink/70">
                  {article.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
