import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Disclaimer from "@/components/Disclaimer";
import GearItem from "@/components/GearItem";
import ProfileNotice from "@/components/ProfileNotice";
import { getProfileBySlug, getProfileSlugs } from "@/lib/content";
import type { GearItem as GearItemType } from "@/lib/types";

// Pre-build a static page for every profile file at build time.
export function generateStaticParams() {
  return getProfileSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) return {};
  return {
    title: profile.name,
    description: profile.summary || profile.tagline,
  };
}

/** Group gear items by their category, preserving first-seen order. */
function groupByCategory(gear: GearItemType[]): [string, GearItemType[]][] {
  const groups = new Map<string, GearItemType[]>();
  for (const item of gear) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }
  return Array.from(groups.entries());
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();

  const grouped = groupByCategory(profile.gear);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/profiles"
        className="text-sm text-gold-dark hover:text-gold"
      >
        ← Back to profiles
      </Link>

      {/* Fictional vs sourced notice, driven by the profile's status field. */}
      <div className="mt-4">
        <ProfileNotice status={profile.status} />
      </div>

      {/* Header */}
      <header className="mt-4">
        <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-paper">
          {profile.sport}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          {profile.name}
        </h1>
        <p className="mt-1 text-lg text-ink/60">{profile.tagline}</p>
        {profile.goals.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.goals.map((goal) => (
              <span
                key={goal}
                className="rounded-md bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold-dark"
              >
                {goal}
              </span>
            ))}
          </div>
        )}
        {profile.summary && (
          <p className="mt-5 text-ink/80">{profile.summary}</p>
        )}
      </header>

      {/* Optional longer bio */}
      {profile.body && (
        <div className="prose-article mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {profile.body}
          </ReactMarkdown>
        </div>
      )}

      {/* Gear & supplements */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-ink">
          Gear &amp; supplements
        </h2>

        {grouped.length === 0 ? (
          <p className="mt-3 text-ink/60">No items listed yet.</p>
        ) : (
          <div className="mt-4 space-y-8">
            {grouped.map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                  {category}
                </h3>
                <ul className="mt-3 space-y-3">
                  {items.map((item, index) => (
                    <GearItem key={`${item.name}-${index}`} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </article>
  );
}
