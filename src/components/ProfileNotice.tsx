import type { ProfileStatus } from "@/lib/types";

/**
 * Top-of-profile notice. Which one shows is driven by the profile's `status`
 * field, so the correct disclaimer appears automatically:
 *
 * - "fictional" → the demo placeholder banner (invented example person).
 * - "sourced"   → a real-content notice (compiled from public reporting).
 *
 * This replaces the old site-wide banner. The separate health/supplement
 * Disclaimer still renders lower on the page.
 */
export default function ProfileNotice({ status }: { status: ProfileStatus }) {
  if (status === "sourced") {
    return (
      <aside
        role="note"
        className="rounded-lg border border-ink/15 bg-paper-soft p-4 text-sm text-ink/70"
      >
        <p className="font-semibold text-ink">About this profile</p>
        <p className="mt-1">
          Information compiled from publicly reported interviews and articles,
          reflecting what the person or their trainer has stated publicly. It
          may not be current, and is not medical or fitness advice.
        </p>
      </aside>
    );
  }

  // status === "fictional"
  return (
    <aside
      role="note"
      className="rounded-lg bg-gold-dark/90 p-4 text-sm text-paper"
    >
      <p className="font-semibold">Fictional example</p>
      <p className="mt-1 text-paper/90">
        Every person, product and claim on this profile is a fictional
        placeholder for layout purposes only — not real advice about any real
        person.
      </p>
    </aside>
  );
}
