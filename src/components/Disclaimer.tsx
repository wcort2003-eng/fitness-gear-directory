/**
 * Health / supplement disclaimer. Place on any page that shows gear,
 * supplements, or health-related article content. This is intentionally
 * plain and visible — do not hide it behind a toggle.
 */
export default function Disclaimer() {
  return (
    <aside
      role="note"
      className="rounded-lg border border-ink/15 bg-paper-soft p-4 text-sm text-ink/70"
    >
      <p className="font-semibold text-ink">Disclaimer</p>
      <p className="mt-1">
        This content is for general information only and is not medical, health,
        or nutrition advice. Supplements and training approaches affect people
        differently and can carry risks. Talk to a qualified doctor or
        registered professional before starting any supplement or training
        program. Links may be affiliate links.
      </p>
    </aside>
  );
}
