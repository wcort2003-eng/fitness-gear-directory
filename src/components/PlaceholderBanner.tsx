/**
 * Site-wide banner making it unmistakable that all data is fictional.
 * Rendered on every page via the root layout. Remove or replace this only
 * once the site carries real, sourced data.
 */
export default function PlaceholderBanner() {
  return (
    <div className="bg-gold-dark/90 text-center text-sm text-paper">
      <p className="mx-auto max-w-5xl px-4 py-2">
        <span className="font-semibold">Demo site.</span> Every person, product
        and claim below is a fictional placeholder for layout purposes only — not
        real advice about any real person.
      </p>
    </div>
  );
}
