import Link from "next/link";
import type { Profile } from "@/lib/types";

/** A single person's card as shown in the directory grid. */
export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/profiles/${profile.slug}`}
      className="group flex flex-col rounded-xl border border-ink/10 bg-paper-soft p-5 transition-colors hover:border-gold"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-paper">
          {profile.sport}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-gold-dark">
        {profile.name}
      </h3>
      <p className="text-sm text-ink/60">{profile.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-ink/70">{profile.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {profile.goals.map((goal) => (
          <span
            key={goal}
            className="rounded-md bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold-dark"
          >
            {goal}
          </span>
        ))}
      </div>
    </Link>
  );
}
