import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Disclaimer from "@/components/Disclaimer";
import { getArticleBySlug, getArticleSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";

// Pre-build a static page for every article file at build time.
export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/articles" className="text-sm text-gold-dark hover:text-gold">
        ← Back to articles
      </Link>

      <header className="mt-4">
        <div className="flex items-center gap-3 text-xs text-ink/50">
          <span className="rounded bg-gold/10 px-2 py-0.5 font-medium text-gold-dark">
            {article.category}
          </span>
          {article.date && <span>{formatDate(article.date)}</span>}
          {article.author && <span>· {article.author}</span>}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-2 text-lg text-ink/60">{article.description}</p>
        )}
      </header>

      <div className="prose-article mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </article>
  );
}
