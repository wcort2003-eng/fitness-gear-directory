import type { GearItem as GearItemType } from "@/lib/types";

/** Renders one gear / supplement row within a profile. */
export default function GearItem({ item }: { item: GearItemType }) {
  return (
    <li className="rounded-lg border border-ink/10 bg-paper-soft p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="rounded bg-ink/5 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-ink/60">
            {item.category}
          </span>
          <h3 className="mt-2 font-semibold text-ink">{item.name}</h3>
        </div>
        <a
          href={item.affiliateLink}
          rel="nofollow sponsored noopener noreferrer"
          target="_blank"
          className="shrink-0 rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          View item
        </a>
      </div>

      {item.note && <p className="mt-2 text-sm text-ink/70">{item.note}</p>}

      {item.source && (
        <p className="mt-2 text-xs text-ink/50">
          <span className="font-semibold text-ink/70">Source:</span>{" "}
          {item.source}
        </p>
      )}
    </li>
  );
}
