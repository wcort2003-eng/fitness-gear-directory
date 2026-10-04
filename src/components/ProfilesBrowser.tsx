"use client";

/**
 * Client-side directory browser: a search box plus a sport filter and a goal
 * filter. All filtering happens in the browser over the full list passed in
 * from the server, so it stays instant and needs no backend.
 */
import { useMemo, useState } from "react";
import type { Profile } from "@/lib/types";
import ProfileCard from "./ProfileCard";

interface ProfilesBrowserProps {
  profiles: Profile[];
  sports: string[];
  goals: string[];
}

const ALL = "All";

export default function ProfilesBrowser({
  profiles,
  sports,
  goals,
}: ProfilesBrowserProps) {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState(ALL);
  const [goal, setGoal] = useState(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles.filter((p) => {
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q);
      const matchesSport = sport === ALL || p.sport === sport;
      const matchesGoal = goal === ALL || p.goals.includes(goal);
      return matchesQuery && matchesSport && matchesGoal;
    });
  }, [profiles, query, sport, goal]);

  const selectClass =
    "rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none";

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="profile-search"
            className="block text-xs font-medium text-ink/60"
          >
            Search
          </label>
          <input
            id="profile-search"
            type="search"
            placeholder="Search by name or keyword…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-1 w-full rounded-md border border-ink/20 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="sport-filter"
            className="block text-xs font-medium text-ink/60"
          >
            Sport
          </label>
          <select
            id="sport-filter"
            value={sport}
            onChange={(event) => setSport(event.target.value)}
            className={`mt-1 ${selectClass}`}
          >
            <option value={ALL}>All sports</option>
            {sports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="goal-filter"
            className="block text-xs font-medium text-ink/60"
          >
            Goal
          </label>
          <select
            id="goal-filter"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            className={`mt-1 ${selectClass}`}
          >
            <option value={ALL}>All goals</option>
            {goals.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="mt-4 text-sm text-ink/50">
        {filtered.length} {filtered.length === 1 ? "profile" : "profiles"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((profile) => (
            <ProfileCard key={profile.slug} profile={profile} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-ink/20 p-8 text-center text-ink/50">
          No profiles match those filters. Try clearing the search or choosing
          &ldquo;All&rdquo;.
        </p>
      )}
    </div>
  );
}
