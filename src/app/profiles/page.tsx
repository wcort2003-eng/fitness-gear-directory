import type { Metadata } from "next";
import ProfilesBrowser from "@/components/ProfilesBrowser";
import { getAllGoals, getAllProfiles, getAllSports } from "@/lib/content";

export const metadata: Metadata = {
  title: "Profiles",
  description:
    "Browse every profile and filter by sport or training goal to find the people — and the gear — most relevant to you.",
};

export default function ProfilesPage() {
  const profiles = getAllProfiles();
  const sports = getAllSports();
  const goals = getAllGoals();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Profiles</h1>
      <p className="mt-2 max-w-2xl text-ink/70">
        Browse the directory and filter by sport or by the goal you&apos;re
        training for. Open a profile to see the gear and supplements associated
        with that person.
      </p>

      <div className="mt-8">
        <ProfilesBrowser profiles={profiles} sports={sports} goals={goals} />
      </div>
    </div>
  );
}
